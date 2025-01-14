import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


function CustomSelect({ options, value, onChange, icons }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className="selected-option" onClick={toggleDropdown}>
        {icons[value] && (
          <img src={icons[value]} alt="icon" className="option-icon" />
        )}
        {value}
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={option}
              className={`option ${option === value ? "selected" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {icons[option] && (
                <img src={icons[option]} alt="icon" className="option-icon" />
              )}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Home() {
  const [currency1, setCurrency1] = useState("BTC");
  const [amount1, setAmount1] = useState("");
  const [currency2, setCurrency2] = useState("USD");
  const [amount2, setAmount2] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});
  const [state, setState] = useState(0);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [current, setCurrent] = useState({});


  const icons = {
    BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    LTC: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
    XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    USD: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    EUR: "https://cdn-icons-png.flaticon.com/512/555/555523.png",
    INR: "https://cdn-icons-png.flaticon.com/512/555/555527.png",
    PKR: "https://cdn-icons-png.flaticon.com/512/555/555528.png",
  };

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/exchange_rates"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Ошибка загрузки данных курсов:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Update amount2 when amount1 or currencies change
  useEffect(() => {
    if (
      !amount1 ||
      !exchangeRates[currency1.toLowerCase()] ||
      !exchangeRates[currency2.toLowerCase()]
    ) {
      setAmount2("");
      return;
    }

    try {
      // Используем курс относительно BTC с увеличением на 4%
      const rate1 = (1 / exchangeRates[currency1.toLowerCase()]?.value) * 1.04;
      const rate2 = 1 / exchangeRates[currency2.toLowerCase()]?.value;

      const calculatedAmount2 = (amount1 * rate1) / rate2;
      setAmount2(parseFloat(calculatedAmount2).toFixed(2));
    } catch (error) {
      console.error("Ошибка при расчёте курса:", error);
    }
  }, [amount1, currency1, currency2, exchangeRates]);

  useEffect(() => {
    if (
      !exchangeRates[currency1.toLowerCase()] ||
      !exchangeRates[currency2.toLowerCase()]
    ) {
      setState(0);
      return;
    }
    
    try {
      const rate1 = (1 / exchangeRates[currency1.toLowerCase()]?.value) * 1.04;
      const rate2 = 1 / exchangeRates[currency2.toLowerCase()]?.value;

      const calculatedAmount2 = (1 * rate1) / rate2;
      setState(
        !!amount2 && !!amount1
          ? parseFloat((amount2 / amount1).toFixed(2))
          : parseFloat(calculatedAmount2.toFixed(2))
      );
    } catch (error) {
      console.error("Ошибка при расчёте коэффициента:", error);
    }
  });
  useEffect(() => {
    setCurrent(JSON.parse(localStorage.getItem('change')))
  },[step1])

  const [email, setEmail] = useState(""); // Состояние для email
  const [simpleInput, setSimpleInput] = useState(""); // Состояние для простого текста
  const [cardNumber, setCardNumber] = useState(""); // Состояние для номера карты
  const [errors, setErrors] = useState({
    email: "",
    simpleInput: "",
    cardNumber: "",
  });

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateCardNumber = (value) => {
    const cardRegex = /^\d{16}$/; // 16 цифр
    return cardRegex.test(value);
  };

  const goToStep1 = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setStep4(false);
  };

  const goToStep2 = () => {
   if (amount1) {
    localStorage.setItem(
      "change",
      JSON.stringify({
        amount1: amount1,
        amount2: amount2,
        currency1: currency1,
        currency2: currency2,
      })
    );
    setStep1(false);
    setStep2(true);
    setStep3(false);
    setStep4(false);
   }
  };

  const goToStep3 = () => {
    setStep1(false);
    setStep2(false);
    setStep3(true);
    setStep4(false);
  };
  const goToStep4 = () => {
    setStep1(false);
    setStep2(false);
    setStep3(false);
    setStep4(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(email) ? "" : "Enter a correct email",
      simpleInput: simpleInput.trim() ? "" : "The field must not be empty",
      cardNumber: validateCardNumber(cardNumber)
        ? ""
        : "Enter the correct card number (16 digits)",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
        goToStep3()
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      {step1 ? (
        <div className="home home1">
          <div className="step_one container">
            <div className="inputs">
              <div className="main_text">
                <h1>Give it away</h1>
                <h1>You receive</h1>
              </div>
              <div className="inputs_int">
                <div>
                  <CustomSelect
                    options={["BTC", "ETH", "LTC", "XRP"]}
                    value={currency1}
                    onChange={setCurrency1}
                    icons={icons}
                  />
                  <input
                    type="number"
                    value={amount1}
                    placeholder="Введите сумму"
                    onChange={(e) => setAmount1(e.target.value)}
                  />
                </div>
                <div  className="swap_icon">
                  <img
                 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASRSURBVHgB7ZxbTiJBFIYPKl7eXAKzgsEVCC8mmnhhBTIrUFcwuAJlBcIKQI2X+EK7ApkVDLMDXow31Pl/qE6IcRCoqu6GOV/SqW6B7qq/T1VXnzpHEUVRFEVRFEVRFEVRlBFISQKp1WoZlnNzc91yZmam/fz83CoUCm1JGLELSLGWlpa239/fszjMYctga5mPuyU+W06lUvz7Mvab2G+iDFDerq+vtyRGYhEQoi1DtF2IsINDClfHdjs7O9u8v78faGk3NzfZ19fXLH6bg4CrKPnd47jEjFRACre4uLiH3SK2AFsVjQ7EgqurqxxELELAbendiENXQp6dne1sbW3VB30nMgHR0J/SE676+Ph47Ho8w/kzELJEq8RhBSIeigU8H4oGzvNt0PfmxDPscp1O5wS7FCzvq5uZ8xZDIVH+9nm9kBnxyPX19R7Gq5r0umo+ijGK19jY2ChCxDIOG5eXl/viEW8CssuiEax8Hg06logx18yjS++Z4cMLXgQ04u1grFuJc5phrp2XXtf2IqJzAUPxnp6e8kmY+FJE3kjWCUPKkTjGqYAc81BwSlFI0lsD68Ib+vb2lsMNPhGHOBMwfPpJBE++caCIGBdXsJvCja5xTioOcGmBDT40kiheP6hfEZb4Z2FhoeFCRCcCmgE6wB2uygSAeu5jmDnFW9GdmTCPjbWApgIlbFYz/6iBJZZQ8IY3bES0FtCMe5Wkd93PcCGilYC8KLrCrkyY9fVjK6KtBeZkQq2vHyMijaDBd/dRfmslIH1y8OGVZQqAiBW054Dv7qOImEiXfpwYhy0dIBVsxdjdWXFxcXGRxXxv5Hke3lgknU4fwxrpjGh99f2pFNA8DI6wGCXjAPFYBDKEgIqiKIqiKIqiKNHzpTPBrGJlxJ4fk+72+oxh3oVz2Og4PWBsnowBXF7ttbW1lkwhQzkTIN4+V9wgRAFCjCXitDKUu+Lh4eGU4sFPxmCdXZkSzs/PrRfah/b30PIgIoN1StMiItrDKK5ALBjJYWa6b1dEnxFPURAuiDE0WCwY2eMYRcRTFLhajh3LZTvpIhrrY0y19XLs2KtyoYgMG5s0EY31lV3MS62WNVkBho0ZEZ2GjfkC9WT43apZC7bGOrQjjL3DbirpIoaLTdIbfpzgJDqLIjJsDLspTHHuXMXeuSRMW0BvOXT5Suk0QpUiMmzMVeydK1gXCNfNFnAd8O48Rppji6vYOxewDryhrJOrca8fL1H6rmLvbAm7rS/xiLc8EVY4qmSXzzAB7xzzyr7EI15DOzjewArqsIAGGsTMygPfPkFjdSeMi8F1meTTEo94j40xgn2jFVJINDAQhxmVIR8yQfmwKEkEfOmRRsN3UJm6OOBDRmXQ6XSqm5ubgVhAl1Q6nd5jrCIOyz4yQQcRW8I1rIXJ1nSLZSFogDJ4eXn5BVGb/xKAv5ufn8/ADbVqMtx5Dmaw1+GzrMaR3BN7gKUZs3LGgr5DDArTNlvLpPtzTtmdV+K4xZR/7N7C2upxZ0Ql9Z9O0EIpGK2tDU94V6RpXJRSFEVRFEVRFEVRFOU/4y++WHGxq6ymBAAAAABJRU5ErkJggg=="
                    alt="Swap Icon"
                  />
                </div>
                <div>
                <h1 className="h12">You receive</h1>
                  <CustomSelect
                    options={["USD", "EUR", "INR", "PKR"]}
                    value={currency2}
                    onChange={setCurrency2}
                    icons={icons}
                  />
                  <input
                    type="number"
                    value={amount2}
                    placeholder="Рассчитанная сумма"
                    readOnly
                  />
                </div>
              </div>
              <p className="tac">
                {"1 " + currency1 + " - " + state + " " + currency2}
              </p>
            </div>
            <div
              className="dsfcen"
            >
              <button onClick={goToStep2}
              className={`button ${amount1 && amount2 ? "active" : ""}`}>Change now</button>
            </div>
            <div className="dsfcen">
            <img className="mainimg"
              src="https://moneyfast.vercel.app/static/media/Bitcoin.7232be9fc09e07e96d30.png"
              alt="Bitcoin"
            />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {step2 ? (
        <div className="home home2">
          <div className="step_two container">
            <div className="dsf mob">
              <div className="two_content">
                <h2>Enter details to complete the exchange</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} // Связываем состояние
                        onBlur={() =>
                          setErrors((prev) => ({
                            ...prev,
                            email: validateEmail(email)
                              ? ""
                              : "Enter a correct email",
                          }))
                        }
                      />
                    </label>
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label>
                      <input
                        type="text"
                        value={simpleInput}
                        placeholder="Cardholder Name"
                        onChange={(e) => setSimpleInput(e.target.value)} // Связываем состояние
                        onBlur={() =>
                          setErrors((prev) => ({
                            ...prev,
                            simpleInput: simpleInput.trim()
                              ? ""
                              : "The field must not be empty",
                          }))
                        }
                      />
                    </label>
                    {errors.simpleInput && (
                      <p style={{ color: "red" }}>{errors.simpleInput}</p>
                    )}
                  </div>

                  <div>
                    <label>
                      <input
                        type="text"
                        value={cardNumber}
                        placeholder="Card Number"
                        maxLength="16"
                        onChange={(e) =>
                          setCardNumber(e.target.value.replace(/\\D/g, ""))
                        } // Удаляем нечисловые символы
                        onBlur={() =>
                          setErrors((prev) => ({
                            ...prev,
                            cardNumber: validateCardNumber(cardNumber)
                              ? ""
                              : "Enter the correct card number (16 digits)",
                          }))
                        }
                      />
                    </label>
                    {errors.cardNumber && (
                      <p style={{ color: "red" }}>{errors.cardNumber}</p>
                    )}
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      className="check"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    I agree to the processing of personal data and accept the{" "}
                    <Link to="/dataProcessing" >rules of exchange</Link >
                  </label>
                  <button
                    className={`button btnsnd ${
                      errors.cardNumber === "" &&
                      errors.email === "" &&
                      errors.simpleInput === "" &&
                      email !== "" &&
                      !!isChecked &&
                      simpleInput !== "" &&
                      cardNumber !== ""
                        ? "active"
                        : ""
                    }`}
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
              <img className="mobimg" src="https://moneyfast.vercel.app/static/media/Bitcoin.7232be9fc09e07e96d30.png" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {step3 ? (
        <div className="home home3">
          <div className="step_three container">
            <h2>To complete the exchange, follow these steps:</h2>
            <p>You change: {current.amount1 + " " + current.currency1 + " to " + current.amount2 + " " + current.currency2}</p>
            <div>
              <p>1. Make a transfer using the details</p>
              <p>
                2. This operation is performed manually. Please make sure that
                you clicked on the “I paid” button and transferred the funds.
              </p>
            </div>
            <p className="pdet">Details (TRC20):</p>
            <input
              readOnly
              value={"bc1q66j8vvp5egdykzhgsuswlkfttrgtme7dj0ddjj"}
            />
            <p className="pdet">Sum:</p>
            <input value={"11546652"} readOnly />
            <div className="dsfcen">
            <div onClick={goToStep4} className="button btnipd active">I paid</div>
            </div>
            <img className="mobimg" src="https://moneyfast.vercel.app/static/media/Bitcoin.7232be9fc09e07e96d30.png" />
          </div>
        </div>
      ) : (
        ""
      )}
      {step4 ? (
        <div className="home home4">
          <div className="step_four container">
            <div className="dsf pad">
              <div>
                <h2>Application accepted for processing</h2>
                <p>You change: {current.amount1 + " " + current.currency1 + " to " + current.amount2 + " " + current.currency2}</p>
                <div>
                  <p>
                    After your money arrives in our account, it will be
                    processed and the funds will be transferred to the address
                    you specified wallet or account.
                  </p>
                  <p>
                    For any questions or in case of delay in exchange, please
                    contact technical support.
                  </p>
                  <p>Sincerely, site administration.</p>
                </div>
                
                <div className="dsfm"><div onClick={goToStep1} className="button active">Cancel</div> </div>
              </div>
              <img className="mobimg" src="https://moneyfast.vercel.app/static/media/Bitcoin.7232be9fc09e07e96d30.png" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
