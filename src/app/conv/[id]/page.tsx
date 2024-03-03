'use client'

import React from 'react'
import MainComponent from '@/components/main'

const PropertyDetails = (ctx: any) => {
    const id = ctx.params.id
    return (
        <div className="flex w-full">
            <MainComponent conversationId={id} />
        </div>
    )
}

export default PropertyDetails