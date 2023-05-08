import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import icons from './scripts/icons'
import {
  maskCardNumber,
  maskExpirationDate,
  maskSecurityCode,
} from './scripts/masks'
import { ReactComponent as CardBackIcon } from './svgs/cardBack.svg'
import { ReactComponent as CardFrontIcon } from './svgs/cardFront.svg'
import { ReactComponent as CardTypeIcon } from './svgs/cardType.svg'

import './CardDetails.scss'
import { CardDetails } from '../../OrderStepper/OrderStepper.interface'

type fields = 'securityCode' | 'expirationDate' | 'cardNumber'

interface IconDetails {
  name: string
  color: string
}

export const PaymentForm = ({
  onValidationChange,
  onValueChange,
  cardInfo,
}: {
  cardInfo: CardDetails
  onValidationChange: (value: boolean) => void
  onValueChange: (callback: (values: CardDetails) => CardDetails) => void
}) => {
  const [flipped, setFlipped] = useState(false)
  const cardNumberRef = useRef(null)
  const expirationDateRef = useRef(null)
  const securityCodeRef = useRef(null)

  const [fieldErrors, setFieldErrors] = useState({
    cardNumber: null,
    expirationDate: null,
    securityCode: null,
  })

  //define the color swap function
  const swapColor = function (basecolor: string) {
    document.querySelectorAll('.lightcolor').forEach(function (input) {
      input.setAttribute('class', '')
      input.setAttribute('class', 'lightcolor ' + basecolor)
    })
    document.querySelectorAll('.darkcolor').forEach(function (input) {
      input.setAttribute('class', '')
      input.setAttribute('class', 'darkcolor ' + basecolor + 'dark')
    })
  }

  useLayoutEffect(() => {
    const cardNumberMask = maskCardNumber(cardNumberRef.current)
    //pop in the appropriate card icon when detected
    cardNumberMask.on('accept', function () {
      const ccIcon = document.getElementById('ccicon')
      const ccSingle = document.getElementById('ccsingle')
      const iconMap: { [key: string]: IconDetails } = {
        'american express': { name: 'amex', color: 'green' },
        visa: { name: 'visa', color: 'lime' },
        diners: { name: 'diners', color: 'orange' },
        discover: { name: 'discover', color: 'purple' },
        jcb: { name: 'jcb', color: 'red' },
        jcb15: { name: 'jcb', color: 'red' },
        maestro: { name: 'maestro', color: 'yellow' },
        mastercard: { name: 'mastercard', color: 'lighblue' },
        unionpay: { name: 'unionpay', color: 'cyan' },
      }
      const type: string = cardNumberMask.masked.currentMask.cardtype
      if (iconMap[type]) {
        if (ccIcon) ccIcon.innerHTML = (icons as any)[iconMap[type]['name']]
        if (ccSingle)
          ccSingle.innerHTML = (icons as any)[iconMap[type]['name'] + '_single']
        swapColor(iconMap[type].color)
      } else {
        if (ccIcon) ccIcon.innerHTML = ''
        if (ccSingle) ccSingle.innerHTML = ''
        swapColor('grey')
      }
    })
    cardNumberMask.on('accept', function () {
      const svg = document.getElementById('svgnumber')
      const value = cardNumberMask.value
      if (svg) {
        svg.innerHTML = value.length === 0 ? '---- ---- ---- ----' : value
      }
    })
    cardNumberMask.on('complete', function () {
      onValueChange((prev: CardDetails) => ({
        ...prev,
        cardNumber: cardNumberMask.value,
      }))
    })

    //Mask the Expiration Date
    const expirationDateMask = maskExpirationDate(expirationDateRef.current)

    expirationDateMask.on('accept', function () {
      const svg = document.getElementById('svgexpire')
      const value = expirationDateMask.value
      if (svg) {
        svg.innerHTML = value.length === 0 ? '--/--' : value
      }
    })
    expirationDateMask.on('complete', function () {
      onValueChange((prev: CardDetails) => ({
        ...prev,
        expirationDate: expirationDateMask.value,
      }))
    })

    //Mask the security code
    const securityCodeMask = maskSecurityCode(securityCodeRef.current)
    securityCodeMask.on('accept', function () {
      const svg = document.getElementById('svgsecurity')
      const value = securityCodeMask.value
      if (svg) {
        svg.innerHTML = value.length === 0 ? '---' : value
      }
    })
    securityCodeMask.on('complete', function () {
      onValueChange((prev: CardDetails) => ({
        ...prev,
        securityCode: securityCodeMask.value,
      }))
    })
  }, [onValueChange])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const svgName = document.getElementById('svgname')
    const svgNameBack = document.getElementById('svgnameback')
    const isBlank = event.target.value.length === 0
    if (svgName) {
      svgName.innerHTML = isBlank ? 'John Doe' : event.target.value
    }
    if (svgNameBack) {
      svgNameBack.innerHTML = isBlank ? 'John Doe' : event.target.value
    }
  }

  const handleBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName: fields = event.target.name as fields
      const isInvalid =
        !cardInfo[fieldName] ||
        (cardInfo[fieldName] && cardInfo[fieldName] !== event.target.value)

      setFieldErrors((prev) => {
        return {
          ...prev,
          [fieldName]: isInvalid ? true : false,
        }
      })
    },
    [cardInfo]
  )

  useEffect(() => {
    onValidationChange(
      Object.values(fieldErrors).every((field) => field === false)
    )
  }, [fieldErrors, onValidationChange])

  return (
    <div className="card-details-container">
      <div className="container">
        <div
          onClick={() => {
            setFlipped((prev) => !prev)
          }}
          className={`creditcard ${flipped ? 'flipped' : ''}`}
        >
          <div className="front">
            <div id="ccsingle"></div>
            <CardFrontIcon />
          </div>
          <div className="back">
            <CardBackIcon />
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="field-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            onChange={handleNameChange}
            maxLength={20}
            type="text"
            onFocus={() => {
              setFlipped(false)
            }}
          />
        </div>
        <div className="field-container">
          <label
            className={fieldErrors['cardNumber'] ? 'invalid-label' : ''}
            htmlFor="cardnumber"
          >
            Card Number
          </label>
          <input
            ref={cardNumberRef}
            id="cardnumber"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            onBlur={handleBlur}
            onFocus={() => {
              setFlipped(false)
            }}
            className={fieldErrors['cardNumber'] ? 'invalid-input' : ''}
          />
          <CardTypeIcon />
        </div>
        <div className="field-container">
          <label
            className={fieldErrors['expirationDate'] ? 'invalid-label' : ''}
            htmlFor="expirationdate"
          >
            Expiration (mm/yy)
          </label>
          <input
            id="expirationdate"
            name="expirationDate"
            type="text"
            inputMode="numeric"
            onBlur={handleBlur}
            onFocus={() => {
              setFlipped(false)
            }}
            ref={expirationDateRef}
            className={fieldErrors['expirationDate'] ? 'invalid-input' : ''}
          />
        </div>
        <div className="field-container">
          <label
            className={fieldErrors['securityCode'] ? 'invalid-label' : ''}
            htmlFor="securitycode"
          >
            Security Code
          </label>
          <input
            id="securitycode"
            name="securityCode"
            type="text"
            inputMode="numeric"
            onBlur={handleBlur}
            onFocus={() => {
              setFlipped(true)
            }}
            ref={securityCodeRef}
            className={fieldErrors['securityCode'] ? 'invalid-input' : ''}
          />
        </div>
      </div>
    </div>
  )
}
