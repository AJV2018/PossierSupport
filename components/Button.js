import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
export default function Button({ children, buttonProps, initialColor = '#eee', hoverColor = '#fff' }) {
    const [mouseEntered, setMouseEntered] = useState(false)
    return (
        <div
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}
            style={{
                width: 'fit-content',
            }}
        >
            <TouchableOpacity
                {...buttonProps}
                style={{
                    backgroundColor: mouseEntered ? hoverColor : initialColor,
                    ...(buttonProps?.style || {})
                }}
            >
                {children}
            </TouchableOpacity>
        </div >
    )
}
