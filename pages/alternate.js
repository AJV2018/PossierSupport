import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
export default function Alternate() {
  const router = useRouter()
  useEffect(() => {
    // alert(window.location.href)
  }, [])
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.text}>
        Alternate Page
      </Text>
      <Text style={styles.link} accessibilityRole="link" onPress={() => {
        Router.push('/')
      }}>
        Go Back
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
  link: {
    color: 'blue',
  },
})
