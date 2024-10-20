'use client'
import { useEffect } from "react";
let apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function Page({ params }: { params: { id: string } }) {
    useEffect(() => {
        if (params.id) {
            
        }
    }, [params.id]);
    const id = params.id;
    return <div>redirecting</div>
}