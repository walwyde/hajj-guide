'use client';
import React, {useState} from 'react';
import { useParams } from "next/navigation"

export default function AboutName () {
    const [name, setName] = useState("ayman");
    const params = useParams();
    console.log(params);
    return <h1>About {params.name}</h1>
}