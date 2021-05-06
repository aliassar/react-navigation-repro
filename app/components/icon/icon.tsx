import * as React from "react"
import { View, Image, ImageStyle, Platform } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
  ...(Platform.OS === "web" && { width: 16, height: 15 }),
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </View>
  )
}
