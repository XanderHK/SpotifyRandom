import { RefObject, useEffect, useRef, useState } from 'react'

// Define a type for the props of the HOC
type HOCProps = {
  // Define any props specific to the HOC here, if needed
}

// Define a type for the props of the wrapped component
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
        if (prevAudio) {
          prevAudio.pause()
        }

        const audio = e.currentTarget.parentNode?.parentNode?.lastChild
          ?.lastChild as HTMLAudioElement

        if (audio) {
          if (prevAudio?.src === audio.src) {
            audio.pause()
          } else {
            if (audio.paused) {
              audio.play()
            } else {
              audio.pause()
            }
          }

          // if prevaudio is paused and prevaudio src is the same as audio source play

          // if prevaudio src is not the same as audio source pause prevaudio and play audio
          // if (prevAudio?.paused && prevAudio.src !== audio.src) {
          //   audio.play()
          //   prevAudio.pause()
          //   setPrevAudio(audio)
          //   return
          // }

          // if (prevAudio?.paused && prevAudio.src === audio.src) {
          //   audio.play()
          //   prevAudio.pause()
          //   setPrevAudio(audio)
          //   return
          // }
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
