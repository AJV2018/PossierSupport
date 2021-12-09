import React from 'react'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'
import styles from './styles/ticketButton.module.css'
export default function TicketButton() {
    const router = useRouter()
    const onPress = () => {
        router.push('/tickets')
        // router.push('/createFaqs')
    }
    return (
        <div
            className={styles.container}
            onClick={onPress}
        >
            <Image
                src={require('../assets/images/ticket.png')}
                width={25}
                height={25}
            />
            <div style={{
                marginLeft: '0.5rem'
            }}>
                My Tickets
            </div>
        </div>
    )
}
