# currency-exchange
Задание 1. «Конвертер валют»
Напишите веб-приложение, «конвертер валют», которое позволит пользователю
пересчитывать суммы денег между разными валютами по текущему курсу
на момент конвертации. В качестве источника информации о курсе валют
можете использовать любой API, который сочтете подходящим, если он не требует
регистрации от проверяющего выполнение задачи.

Для конечного пользователя должен быть предоставлен интерфейс в виде страницы,
где пользователь может указать исходную сумму, исходную валюту и целевую
валюту перевода, и после этого увидеть итоговую сумму.

Имеется два роута:
 - /?from=&to=&amount= конвертация суммы amount в исходной валюте from в целевую валюту to
 - /currencies возвращает список доступных валют
 
 Этапы написания кода:
  1) Получить данные от апи: функция getCurrencyRate
  2) Получить все валюты в необходимом виде: функция getCurrencyTypes - формирует массив вида [{ name: "Российский рубль", code: 'RUB'}]
  3) Произвести конвертацию: функция convert(fromCurrency, toCurrency, amount)
    - получаем курс исходной валюты к рублю
    - получаем курс исходной валюты к целевой
    - умножаем сумму на курс
    
Запуск приложения:
  1) Запуск бэка
    - cd currency-exchange/backend/
    - npm start
  2) Запуск фронта
    - cd currency-exchange/frontend/
    - npm start
