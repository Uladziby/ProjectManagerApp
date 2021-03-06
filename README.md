# ProjectManagerApp -  Система управления проектами

Система управления проектами – приложение помогающее достичь поставленные задачи отдельному человеку в команде или группе разработчиков.

## Команда
- Влад Янушевский - https://github.com/Uladziby
- Элина Непомнящая - https://github.com/elina-nep
- Александр Поделинский - https://github.com/alexpodelinskii

## Сайт развёрнут по адресу
https://phenomenal-youtiao-f31f31.netlify.app/

## Серверная часть
https://rocky-basin-88858.herokuapp.com/

## Используемые технологии и библиотеки
- typescript - была выбрана для уменьшения ошибок и ошибок интеграции модулей в задаче.
- angular-router - библиотека для создания ротинга в приложении. Премущества: быстрый старт, возможность настройки guards и lasy load. 
- flex-layout - библиотека для упрощеной реализации flex-разметки. Преимущества: возможность настроить разметку непосредственно в компоненте. Широкие возможности адания различных разметок. Недостатки: описние сложной сетки в компоненте получается черезчур длинным.
- forms - библиотека для создания и валидации форм. Преимущества: упрощенная валидация и настройка форм.
- angular-material - библиотека для оформления приложения. Использовалась только для стилей и создания некоторых компонентов (button, input и др.). Стили в большинстве случаев использовались на первом этапе проверки функциональности (чтобы не тратить время), а далее заменялись индивидуальными. Преимущества: оформление многих компонент задано по умолчанию. Недостатки: Маленькая вариативность.
- material-icons - библиотека иконок. Использовалась из-за возможности вставлять иконки как шрифты или картинки. Достоинство: быстрый стар; несколько вариантов добавления на страницу в том числе как шрифт, что позволяет легко управлят цветом и размером иконок; оптимальный набор иконок, не слишком много не мало. Недостатки: нет, к требованиям нашего проекта подходит идеально.
- drag-and-drop - библиотека, позваляющая организовать перетаскивание карточек задач между колонками, внутри одной колонки, а также менять местами колонки. Преимущества: идеально подходит под нашу задачу.

## Доступные скрипты
Находясь в папке приложения вы можете запустить:

### `ng serve`
Запуск приложения в режиме "разработка" Открывается на странице http://localhost:4000 вашего браузера по умолчанию.
При изменении кода, страница обновляется автоматически В консоль выводятся ошибки линтера.

### `ng build`
Собирает приложение в папку `dist/`
Билд оптимизирован и готов к разворачиванию на сервере.
