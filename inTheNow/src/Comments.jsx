import React from 'react'
import Giscus from '@giscus/react';

export default function () {
  return (
    <div>
        <Giscus
                id="comments"
                repo="JozeSIMAO/inTheNow"
                repoId="R_kgDOL9obvw"
                category="Announcements"
                categoryId="DIC_kwDOL9obv84Cfpf8"
                mapping="/:lang/:NewsBoard/:url"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="dark"
                lang="en"
                loading="lazy"
            />
    </div>
  )
}
