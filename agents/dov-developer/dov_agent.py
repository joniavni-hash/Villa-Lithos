#!/usr/bin/env python3

"""
💻 דב (Dov) — Developer & QA Domain Agent

Handles: software development, code generation, bug fixes, testing,
code review, refactoring, tool building, and quality assurance.
Integrates with: GitHub repos, CI/CD pipelines, project workspaces.

Multi-tier routing:
- Tier 1 (70-80%): simple fixes, small features, code review, linting
- Tier 2 (15-20%): feature development, refactoring, test suites, debugging
- Tier 3 (5-10%): architecture design, complex integrations, security review
"""

import json
import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional

sys.path.insert(0, str(Path(__file__).parent.parent / "_shared"))
from domain_agent_base import (
    DomainAgent, AgentOutput, RoutingResult, ModelTier, WORKSPACE
)

DOV_WORKSPACE = WORKSPACE / "workspace-dov"
PROJECT_REGISTRY = DOV_WORKSPACE / "PROJECT_REGISTRY.md"
QA_STATE = WORKSPACE / "state" / "qa_state.json"


class DovAgent(DomainAgent):
    """Developer and QA domain agent."""

    AGENT_NAME = "דב"
    AGENT_EMOJI = "💻"
    DOMAIN = "development"
    KEYWORDS = [
        # Hebrew
        "פיתוח", "קוד", "באג", "תיקון", "בדיקות", "טסטים",
        "רפקטור", "פריסה", "דיפלוי", "גיט", "ענף",
        "קומפוננטה", "פיצ'ר", "שגיאה בקוד", "לבנות",
        "אפליקציה", "כלי", "סקריפט חדש", "API חדש",
        # English
        "develop", "code", "bug", "fix", "test", "testing",
        "refactor", "deploy", "git", "branch", "PR", "pull request",
        "component", "feature", "build", "compile", "lint",
        "app", "tool", "script", "API", "endpoint",
        "debug", "error", "crash", "regression",
        "review", "QA", "quality", "coverage",
        "npm", "pip", "install", "dependency",
        "frontend", "backend", "fullstack",
        "react", "next", "python", "typescript",
    ]

    TASK_TYPES = {
        "bug_fix": {
            "tier": "tier1",
            "keywords": ["bug", "fix", "באג", "תיקון", "error", "crash", "שגיאה"],
        },
        "code_review": {
            "tier": "tier1",
            "keywords": ["review", "PR", "pull request", "lint", "בדיקת קוד"],
        },
        "small_feature": {
            "tier": "tier1",
            "keywords": ["add", "הוסף", "small", "simple", "קטן", "פשוט"],
        },
        "feature_dev": {
            "tier": "tier2",
            "keywords": ["feature", "פיצ'ר", "develop", "פיתוח", "build", "לבנות", "implement"],
        },
        "testing": {
            "tier": "tier2",
            "keywords": ["test", "טסט", "בדיקות", "coverage", "QA", "quality"],
        },
        "refactor": {
            "tier": "tier2",
            "keywords": ["refactor", "רפקטור", "cleanup", "optimize", "improve"],
        },
        "debugging": {
            "tier": "tier2",
            "keywords": ["debug", "דיבאג", "investigate", "trace", "regression"],
        },
        "new_app": {
            "tier": "tier3",
            "keywords": ["new app", "אפליקציה חדשה", "new tool", "כלי חדש", "from scratch", "מאפס"],
        },
        "architecture": {
            "tier": "tier3",
            "keywords": ["architecture", "ארכיטקטורה", "system design", "תכנון מערכת"],
        },
        "security_review": {
            "tier": "tier3",
            "keywords": ["security", "אבטחה", "vulnerability", "פרצה", "audit"],
        },
    }

    def can_handle(self, message: str, context: Dict, attachments: List[str] = None) -> RoutingResult:
        """Check if this is a development/QA request."""
        score = self.keyword_match(message)

        # Boost for explicit dev requests
        if re.search(r'(פיתוח|develop|build|לבנות|תפתח)', message, re.IGNORECASE):
            score = max(score, 0.9)

        # Boost for code/bug related
        if re.search(r'(באג|bug|fix|תקן|debug|שגיאה בקוד)', message, re.IGNORECASE):
            score = max(score, 0.85)

        # Boost for new app/tool requests
        if re.search(r'(אפליקציה חדשה|new app|כלי חדש|new tool|תבנה)', message, re.IGNORECASE):
            score = max(score, 0.95)

        # Boost for test/QA requests
        if re.search(r'(בדיקות|test|QA|quality)', message, re.IGNORECASE):
            score = max(score, 0.8)

        task_type = self._classify_task(message)
        tier = self._get_tier(task_type)

        return RoutingResult(
            can_handle=score >= 0.3,
            confidence=score,
            domain=self.DOMAIN,
            tier=tier,
            estimated_cost_usd=self.estimate_cost(tier),
            reason=f"Development task: {task_type} → {tier.value}",
        )

    def process(self, message: str, context: Dict, attachments: List[str] = None) -> AgentOutput:
        """Process development/QA request."""
        self._start_timer()

        task_type = self._classify_task(message)
        tier = self._get_tier(task_type)

        project_registry = self._load_project_registry()
        qa_state = self._load_qa_state()

        prompt = self._build_prompt(task_type, message, project_registry, qa_state, context)

        return AgentOutput(
            decision="complete",
            confidence=0.85,
            domain=self.DOMAIN,
            agent_name=self.AGENT_NAME,
            model_tier=tier.value,
            cost_usd=self.estimate_cost(tier),
            summary=f"Development task processed: {task_type}",
            details=prompt,
            draft={
                "type": task_type,
                "prompt_file": "agents/dov-developer/dov_prompt.md",
                "tier": tier.value,
                "project_registry_loaded": project_registry is not None,
                "qa_state_loaded": qa_state is not None,
            },
            tools_used=["read", "exec", "edit", "write"],
            duration_ms=self._elapsed_ms(),
            qa_result="pass",
        )

    def _classify_task(self, message: str) -> str:
        msg = message.lower()
        for task_type, config in self.TASK_TYPES.items():
            if any(kw in msg for kw in config["keywords"]):
                return task_type
        return "feature_dev"

    def _get_tier(self, task_type: str) -> ModelTier:
        config = self.TASK_TYPES.get(task_type, {})
        tier_str = config.get("tier", "tier1")
        return {
            "tier1": ModelTier.TIER1_CHEAP,
            "tier2": ModelTier.TIER2_MID,
            "tier3": ModelTier.TIER3_PREMIUM,
        }.get(tier_str, ModelTier.TIER1_CHEAP)

    def _load_project_registry(self) -> Optional[str]:
        try:
            return PROJECT_REGISTRY.read_text(encoding="utf-8")
        except FileNotFoundError:
            return None

    def _load_qa_state(self) -> Optional[str]:
        try:
            return QA_STATE.read_text(encoding="utf-8")
        except FileNotFoundError:
            return None

    def _build_prompt(self, task_type: str, message: str, registry: Optional[str],
                      qa_state: Optional[str], context: Dict) -> str:
        return f"""You are דב (Dov), a Developer & QA Agent working under Dvorah.
Task: {task_type}
User message: {message}

Project Registry:
{registry[:2000] if registry else 'No project registry loaded.'}

QA State:
{qa_state[:1000] if qa_state else 'No QA state loaded.'}

Guidelines:
- Read and understand existing code before making changes
- Follow project conventions and patterns
- Write typed, clean code — no shortcuts
- Test at boundaries, validate user input and API responses
- Report blockers to Dvorah, don't guess
"""


def test_dov():
    dov = DovAgent()
    print(f"Agent: {dov}")

    tests = [
        "תפתח לי פיצ'ר חדש לגלריה",
        "יש באג בטופס יצירת קשר",
        "תבנה אפליקציה חדשה לניהול הזמנות",
        "תעשה code review ל-PR",
        "מה מזג האוויר?",
    ]

    for msg in tests:
        result = dov.can_handle(msg, {"sender": "yoni"})
        print(f"\n'{msg}'")
        print(f"  Can handle: {result.can_handle} (conf: {result.confidence:.2f})")
        print(f"  Tier: {result.tier.value}")


if __name__ == "__main__":
    test_dov()
