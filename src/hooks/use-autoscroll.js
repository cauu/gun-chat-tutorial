import { useCallback, useRef, useState } from 'react'
import { debounce } from 'lodash-es'

function useAutoScroll () {
  const scrollBottom = useRef()
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [canAutoScroll, setCanAutoScroll] = useState(true);

  const autoScroll = useCallback(() => {
    if (canAutoScroll) {
      setTimeout(() => {
        scrollBottom.current?.scrollIntoView({ behavior: 'auto' })
      }, 50);
    }
  }, [canAutoScroll])

  const watchScroll = useCallback((e) => {
    setCanAutoScroll((e.target.scrollTop || Infinity) > lastScrollTop)
    setLastScrollTop(e.target.scrollTop)
  }, [])

  const debouncedWatchScroll = debounce(watchScroll, 1000);

  return {
    scrollTarget: scrollBottom,
    watchScroll: debouncedWatchScroll,
    autoScroll
  }
}

export { useAutoScroll }