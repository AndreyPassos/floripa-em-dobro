const React = require('react')

const INSETS = { top: 44, bottom: 34, left: 0, right: 0 }
const FRAME = { x: 0, y: 0, width: 390, height: 844 }

const SafeAreaInsetsContext = React.createContext(INSETS)
const SafeAreaFrameContext = React.createContext(FRAME)

function SafeAreaProvider({ children, initialMetrics }) {
  const insets = (initialMetrics && initialMetrics.insets) || INSETS
  const frame = (initialMetrics && initialMetrics.frame) || FRAME
  return React.createElement(
    SafeAreaFrameContext.Provider,
    { value: frame },
    React.createElement(SafeAreaInsetsContext.Provider, { value: insets }, children)
  )
}

function SafeAreaView({ children, style }) {
  return React.createElement(React.Fragment, null, children)
}

function useSafeAreaInsets() {
  return React.useContext(SafeAreaInsetsContext)
}

function useSafeAreaFrame() {
  return React.useContext(SafeAreaFrameContext)
}

module.exports = {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaInsetsContext,
  SafeAreaFrameContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
  initialWindowMetrics: { frame: FRAME, insets: INSETS },
}
