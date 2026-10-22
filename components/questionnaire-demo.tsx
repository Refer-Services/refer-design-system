"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/registry/refer/ui/questionnaire"

const items = [
  {
    name: "relationship",
    required: true,
    choices: [{ value: "worked" }, { value: "studied" }, { value: "friend" }],
  },
  {
    name: "strengths",
    choices: [
      { value: "leadership" },
      { value: "craft" },
      { value: "communication" },
    ],
  },
] as const

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  toast("Referral details saved", {
    description: `Relationship: ${formData.get("relationship") ?? "None"} · Strengths: ${formData.getAll("strengths").join(", ") || "None"}`,
  })
}

export function QuestionnaireDemo() {
  return (
    <Questionnaire
      className="w-full max-w-lg"
      items={items}
      onSubmit={handleSubmit}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="relationship" required>
        <QuestionnaireTitle>How do you know the candidate?</QuestionnaireTitle>
        <QuestionnaireDescription>
          This helps the hiring team weigh your referral.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="worked">
            <span className="font-medium">We worked together</span>
            <QuestionnaireChoiceDescription>
              Same team or close collaboration
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="studied">
            <span className="font-medium">We studied together</span>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="friend">
            <span className="font-medium">Personal connection</span>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="strengths" multiple>
        <QuestionnaireTitle>What are their strengths?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick all that apply.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="leadership">Leadership</QuestionnaireChoice>
          <QuestionnaireChoice value="craft">Craft</QuestionnaireChoice>
          <QuestionnaireChoice value="communication">
            Communication
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions className="w-full">
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Save referral</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
