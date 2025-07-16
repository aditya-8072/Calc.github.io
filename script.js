
    const resultField = document.getElementById('result');
    const historyList = document.getElementById('historyList');
    const themeToggle = document.getElementById('themeToggle');
    let history = [];

    function appendNumber(number) {
      resultField.value += number;
    }

    function appendOperator(operator) {
      const lastChar = resultField.value.slice(-1);
      if ("+-*/".includes(lastChar)) {
        resultField.value = resultField.value.slice(0, -1);
      }
      resultField.value += operator;
    }

    function appendDot() {
      const lastNumber = resultField.value.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes(".")) {
        resultField.value += ".";
      }
    }

    function calculate() {
      try {
        const expression = resultField.value;
        const result = eval(expression);
        resultField.value = result;

        addToHistory(expression + " = " + result);
      } catch (error) {
        resultField.value = "Error";
        setTimeout(clearResult, 1500);
      }
    }

    function clearResult() {
      resultField.value = '';
    }

    function backspace() {
      resultField.value = resultField.value.slice(0, -1);
    }

    function addToHistory(entry) {
      history.unshift(entry);
      if (history.length > 5) history.pop();
      historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    }

    document.addEventListener("keydown", function (event) {
      const key = event.key;

      if (!isNaN(key) || "+-*/.".includes(key)) {
        resultField.value += key;
      } else if (key === "Enter") {
        event.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        backspace();
      } else if (key === "Escape") {
        clearResult();
      }
    });

    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark", themeToggle.checked);
    });
