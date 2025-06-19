import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expMonth, setExpMonth] = useState('')
  const [expYear, setExpYear] = useState('')
  const [cvc, setCvc] = useState('')

  const [usernameErrorMessage, setUsernameErrorMessage] = useState(false);
  const [cardNumberErrorMessage, setCardNumberErrorMessage] = useState(false);
  const [expMonthErrorMessage, setExpMonthErrorMessage] = useState(false);
  const [expYearErrorMessage, setExpYearErrorMessage] = useState(false);
  const [cvcErrorMessage, setCvcErrorMessage] = useState(false);

  const [thankyouPage, setThankyouPage] = useState(false);

  const handleUsernameInput = (e) =>{
    setUsername(e.target.value);
    setUsernameErrorMessage(false);
  }
  const handleCardNumberInput = (e) =>{
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    setCardNumber(numericValue);
    setCardNumberErrorMessage(false);
  }
  const handleExpMonthInput = (e) =>{
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    setExpMonth(numericValue);
    setExpMonthErrorMessage(false);
  }
  const handleExpYear = (e) =>{
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    setExpYear(numericValue);
    setExpYearErrorMessage(false);
  }
  const handleCvcInput = (e) =>{
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    setCvc(numericValue);
    setCvcErrorMessage(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;

    if(username.trim() === ''){
      setUsernameErrorMessage(true);
      formIsValid = false;
    } else {
      setUsernameErrorMessage(false);
    }

    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if(cleanedCardNumber.length !== 16 || !/^\d{16}$/.test(cleanedCardNumber)) {
      setCardNumberErrorMessage(true);
      formIsValid = false;
    } else {
      setCardNumberErrorMessage(false);
    }

    const currentFullYear = new Date().getFullYear();
    const currentYearLastTwoDigits = currentFullYear % 100;
    const currentMonth = new Date().getMonth() + 1;

    const parsedMonth = parseInt(expMonth, 10);
    const parsedYear = parseInt(expYear, 10);

    if (expMonth.trim() === '' || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      setExpMonthErrorMessage(true);
      formIsValid = false;
    } else {
      setExpMonthErrorMessage(false);
    }

    if (expYear.trim() === '' || expYear.length !== 2 || isNaN(parsedYear) || parsedYear < currentYearLastTwoDigits || parsedYear > (currentYearLastTwoDigits + 10)) {
      setExpYearErrorMessage(true);
      formIsValid = false;
    } else {
      setExpYearErrorMessage(false);
    }

    if(cvc.length !== 3 && cvc.length !== 4 || !/^\d{3,4}$/.test(cvc)) {
      setCvcErrorMessage(true);
      formIsValid = false;
    } else {
      setCvcErrorMessage(false);
    }

    if(formIsValid){
      setThankyouPage(true);
    } else {
      setThankyouPage(false);
    }
  }

  const handleFormReset = () =>{
    setUsername('');
    setCardNumber('');
    setExpMonth('');
    setExpYear('');
    setCvc('');

    setUsernameErrorMessage(false);
    setCardNumberErrorMessage(false);
    setExpMonthErrorMessage(false);
    setExpYearErrorMessage(false);
    setCvcErrorMessage(false);

    setThankyouPage(false);
  }

  const formatCardNumber = (num) => {
    // First, ensure the number passed to this function is clean (no spaces, only digits)
    const cleaned = num.replace(/\s/g, '').replace(/[^0-9]/g, '');
    // Then, insert a space after every group of four digits
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <>    
      {thankyouPage ? (
        <div className='font-Space-Grotesk grid min-h-screen place-content-center lg:flex lg:items-center lg:gap-8 xl:gap-14'>
          <img 
            className='absolute z-0 top-0 left-0 w-full h-1/3 lg:hidden'
            src="images/bg-main-mobile.png" 
            alt="bg-mobile" 
          />
          <img 
            className='hidden lg:block lg:absolute lg:z-0 lg:top-0 lg:left-0 lg:w-1/3 lg:h-full'
            src="images/bg-main-desktop.png" 
            alt="bg-mobile" 
          />
          <div className='flex flex-col-reverse relative p-5 max-w-sm h-74 justify-self-center
            lg:flex-col lg:gap-4 lg:h-full lg:max-w-full'>
            <div className='z-2'>
              <img 
                className='w-10/12 mt-[-4rem] lg:mt-0 ' 
                src="images/bg-card-front.png " 
                alt="card-front" 
              />
              <div className='absolute bottom-5 w-3/4 p-5 lg:top-5 lg:p-7'>
                <img
                  className='w-1/4 mb-4' 
                  src="images/card-logo.svg" 
                  alt="card-logo" 
                />
                <p className='font-medium text-white text-xl mb-1 mt-7 tracking-wider lg:text-2xl lg:mt-10'>{cardNumber ? formatCardNumber(cardNumber) : ('0000 0000 0000 0000')}</p>
                <div className='flex font-medium text-white text-sm justify-between lg:text-base lg:mt-4'>
                  <p>{username ? username : ('Jane Appleseed')}</p>
                  <p>{expMonth ? expMonth : ('00')}/{expYear ? expYear : ('00')}</p>
                </div>
              </div>
            </div>

            <div className='z-1 w-10/12 place-self-end mt-2 '>
              <img
                className='w-full' 
                src="images/bg-card-back.png" 
                alt="card-back" 
              />
              <p className='absolute font-medium text-white text-[0.65rem] text-right top-24 w-3/4 right-15 
              lg:top-84 lg:right-16 lg:text-base'>{cvc ? cvc : ('000')}</p>
            </div>
          </div>

          <div className='justify-self-center w-full text-center p-6 lg:w-1/3'>
            <img 
              className='mx-auto w-1/3' 
              src="images/icon-complete.svg" 
              alt="icon-complete" 
            />
            <p className='text-3xl text-purple950 font-semibold tracking-widest mt-8 mb-4'>THANK YOU!</p>
            <p className='text-xl text-gray400 my-5'>We've added your card details</p>
            <button 
              className='w-full bg-purple950 text-white text-2xl font-semibold rounded-md p-4' 
              type="reset"
              onClick={handleFormReset}>Continue</button>
          </div>
        </div>

        ) : (

        <div className='font-Space-Grotesk grid min-h-screen place-content-center lg:flex lg:items-center lg:gap-8 xl:gap-12'>
          <img 
            className='absolute z-0 top-0 left-0 w-full h-1/3 lg:hidden'
            src="images/bg-main-mobile.png" 
            alt="bg-mobile" 
          />
          <img 
            className='hidden lg:block lg:absolute lg:z-0 lg:top-0 lg:left-0 lg:w-1/3 lg:h-full'
            src="images/bg-main-desktop.png" 
            alt="bg-mobile" 
          />
          <div className='flex flex-col-reverse relative p-5 max-w-sm h-74 justify-self-center
            lg:flex-col lg:gap-4 lg:h-full lg:max-w-full xl:w-2/5'>
            <div className='z-2'>
              <img 
                className='w-10/12 mt-[-4rem] lg:mt-0 ' 
                src="images/bg-card-front.png " 
                alt="card-front" 
              />
              <div className='absolute bottom-5 w-3/4 p-5 lg:top-5 lg:p-7 xl:p-9'>
                <img
                  className='w-1/4 mb-4' 
                  src="images/card-logo.svg" 
                  alt="card-logo" 
                />
                <p className='font-medium text-white text-xl mb-1 mt-7 tracking-wider lg:text-2xl lg:mt-10 xl:tracking-widest xl:text-[26px] xl:mt-13'>{cardNumber ? formatCardNumber(cardNumber) : ('0000 0000 0000 0000')}</p>
                <div className='flex font-medium text-white text-sm justify-between lg:text-base lg:mt-4 xl:text-lg xl:mt-5'>
                  <p>{username ? username : ('Jane Appleseed')}</p>
                  <p>{expMonth ? expMonth : ('00')}/{expYear ? expYear : ('00')}</p>
                </div>
              </div>
            </div>

            <div className='z-1 w-10/12 place-self-end mt-2 '>
              <img
                className='w-full' 
                src="images/bg-card-back.png" 
                alt="card-back" 
              />
              <p className='absolute font-medium text-white text-[0.65rem] text-right top-24 w-3/4 right-15 
              lg:top-84 lg:right-16 lg:text-base xl:top-100 xl:right-18'>{cvc ? cvc : ('000')}</p>
            </div>
          </div>
      
          <div className='p-5 max-w-md justify-self-center'>
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="name" className='text-purple950 font-medium tracking-widest'>CARDHOLDER NAME
                <input
                  className={`w-full border ${usernameErrorMessage ? 'border-red400' : 'border-gray200'} rounded-md text-lg p-1.5 pl-3 mt-2 mb-6
                  placeholder:text-gray200 hover:border-purple950 focus:border focus:outline-0 focus:border-purple950 cursor-pointer`} 
                  type="text" 
                  id='name' 
                  placeholder='e.g. Jane Appleseed'
                  value={username}
                  onChange={handleUsernameInput}
                />
              </label>
              {usernameErrorMessage && <p className='text-red400 font-medium -mt-4 mb-2 text-[12px]'>Can't be blank</p>}

              <label htmlFor="card-number" className='text-purple950 font-medium tracking-widest'>CARD NUMBER
                <input
                  className={`w-full border ${cardNumberErrorMessage ? 'border-red400' : 'border-gray200'} rounded-md text-lg p-1.5 pl-3 mt-2 mb-6 
                  placeholder:text-gray200 hover:border-purple950 focus:border focus:outline-0 focus:border-purple950 cursor-pointer`}
                  type='text' 
                  id='card-number'
                  inputMode='numeric'
                  pattern='[0-9\s]*'
                  maxLength='19'
                  placeholder='e.g. 1234 5678 9123 0000'
                  value={formatCardNumber(cardNumber)}
                  onChange={handleCardNumberInput}
                />
              </label>
              {cardNumberErrorMessage && <p className='text-red400 font-medium -mt-4 mb-2 text-[12px]'>Can't be blank</p>}

              <div className='flex gap-3'>
                <div className='w-3/5'>
                  <label htmlFor="exp-month" className='text-purple950 font-medium tracking-widest'>EXP. DATE (MM/YY)
                    <div className='flex gap-2'>
                      <div className='w-1/2'>
                        <input
                          className={`w-full border ${expMonthErrorMessage ? 'border-red400' : 'border-gray200'} rounded-md text-lg p-1.5 pl-3 my-2 
                          placeholder:text-gray200 hover:border-purple950 focus:border focus:outline-0 focus:border-purple950 cursor-pointer`} 
                          type="text" 
                          inputMode='numeric'
                          pattern='\d*'
                          maxLength='2'
                          name="exp-month" 
                          id="exp-month"
                          placeholder='MM'
                          value={expMonth}
                          onChange={handleExpMonthInput}
                        />
                        {expMonthErrorMessage && <p className='text-red400 font-medium mb-2 text-[10px]'>Can't be blank</p>}
                      </div>

                      <div className='w-1/2 '>
                        <input
                          className={`w-full border ${expYearErrorMessage ? 'border-red400' : 'border-gray200'} rounded-md text-lg p-1.5 pl-3 my-2 
                          placeholder:text-gray200 hover:border-purple950 focus:border focus:outline-0 focus:border-purple950 cursor-pointer`} 
                          type="text" 
                          inputMode='numeric'
                          pattern='\d*'
                          maxLength='2'
                          name="exp-year" 
                          id="exp-year" 
                          placeholder='YY'
                          value={expYear}
                          onChange={handleExpYear}
                        />
                        {expYearErrorMessage && <p className='text-red400 font-medium mb-2 text-[10px]'>Can't be blank</p>}
                      </div>
                    </div>
                  </label>
                </div>

                <div className='w-2/5'>
                  <label htmlFor="cvc" className='text-purple950 font-medium tracking-widest'>CVC
                    <input
                      className={`w-full border ${cvcErrorMessage ? 'border-red400' : 'border-gray200'} rounded-md text-lg p-1.5 pl-3 my-2 
                      placeholder:text-gray200 hover:border-purple950 focus:border focus:outline-0 focus:border-purple950 cursor-pointer`} 
                      type="text" 
                      inputMode='numeric'
                      pattern='\d*'
                      maxLength='4'
                      name="cvc" 
                      id="cvc"
                      placeholder='e.g. 123'
                      value={cvc}
                      onChange={handleCvcInput}
                    />
                  </label>
                  {cvcErrorMessage && <p className='text-red400 font-medium mb-2 text-[12px]'>Can't be blank</p>}
                </div>
              </div>
          
              <button
                className='w-full bg-purple950 text-white font-medium text-xl p-3 rounded-xl mt-6' 
                type="submit">Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </>    
  )}

export default App
