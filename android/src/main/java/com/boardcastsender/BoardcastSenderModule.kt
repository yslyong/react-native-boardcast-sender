package com.boardcastsender

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = BoardcastSenderModule.NAME)
class BoardcastSenderModule(reactContext: ReactApplicationContext) :
  NativeBoardcastSenderSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  // Sends a broadcast intent with the given action and extras
  @com.facebook.react.bridge.ReactMethod
  override fun sendBroadcast(action: String, extras: com.facebook.react.bridge.ReadableMap) {
    val intent = android.content.Intent(action)
    val iterator = extras.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (val value = extras.getDynamic(key)) {
        is com.facebook.react.bridge.Dynamic -> {
          when {
            value.isNull -> intent.putExtra(key, null as String?)
            value.asString() != null -> intent.putExtra(key, value.asString())
            value.asBoolean() != null -> intent.putExtra(key, value.asBoolean())
            value.asDouble() != null -> intent.putExtra(key, value.asDouble())
            else -> intent.putExtra(key, value.toString())
          }
        }
        else -> intent.putExtra(key, value.toString())
      }
    }
    reactApplicationContext.sendBroadcast(intent)
  }

  companion object {
    const val NAME = "BoardcastSender"
  }
}
