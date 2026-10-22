import { FileTextIcon, LinkIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/refer/ui/attachment"

export function AttachmentDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Attachment className="w-full">
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>ana-souza-cv.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 312 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove ana-souza-cv.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-full">
        <AttachmentMedia>
          <LinkIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>linkedin.com/in/anasouza</AttachmentTitle>
          <AttachmentDescription>Profile link</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove profile link">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
