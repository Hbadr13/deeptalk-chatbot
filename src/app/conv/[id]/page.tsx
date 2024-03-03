'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import MainComponent from '@/components/main'
import { useRouter } from 'next/navigation'

const PropertyDetails = (ctx: any) => {
    const [idOfSelectedConv, setIdOfSelectedConv] = useState(0)
    const [option, setOption] = useState('chat')
    const router = useRouter()
    const id = ctx.params.id
    return (
        <MainComponent conversationId={id} />
    )
}

export default PropertyDetails