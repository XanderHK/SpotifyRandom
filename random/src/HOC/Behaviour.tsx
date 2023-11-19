import { RefObject, useEffect, useRef, useState } from 'react'

type HOCProps = {}

export type WrappedComponentProps = {
  handleAudioControl: (event: React.MouseEvent) => void
}

const WithSharedHOC = <P extends HOCProps>(
  WrappedComponent: React.ComponentType<P & WrappedComponentProps>,
) => {
  return function SharedHOC(props: P) {
    const buttonRef: RefObject<HTMLButtonElement> = useRef(null)

    function scrollFunction() {
      const buttonElem = buttonRef.current

      if (buttonElem) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          buttonElem.style.display = 'block'
        } else {
          buttonElem.style.display = 'none'
        }
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }

    useEffect(() => {
      window.onscroll = function () {
        scrollFunction()
      }
    }, [])

    const [prevAudio, setPrevAudio] = useState<HTMLAudioElement>()
    const handleAudioControl = (e: React.MouseEvent) => {
      try {
        const audio =
          e.currentTarget.parentNode?.parentNode?.lastChild?.lastChild

        if (audio instanceof HTMLAudioElement) {
          if (prevAudio) {
            prevAudio.pause()
            prevAudio.currentTime = 0
          }
          if (prevAudio === audio) {
            setPrevAudio(undefined)
          } else {
            setPrevAudio(audio)
            audio.play()
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    return (
      <div>
        <WrappedComponent {...props} handleAudioControl={handleAudioControl} />
        <button ref={buttonRef} className="top-button" onClick={topFunction}>
          <i className="fa-solid fa-angle-up"></i>
        </button>
      </div>
    )
  }
}

export default WithSharedHOC
