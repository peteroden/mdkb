import React from 'react'
import ReactMarkdown from 'react-markdown'

export const Markdown1 = () => {
    return (
        <ReactMarkdown>{`
# Heading 1

Content 1

## Heading 2

Content 2
        `}</ReactMarkdown>
    );
}
