import { useRouter } from 'next/router'
import React from 'react'
import { View, Text } from 'react-native'

export default function DynamicRoute() {
    const router = useRouter()

    return (
        <View>
            <Text>{JSON.stringify(router.query)}</Text>
        </View>
    )
}
