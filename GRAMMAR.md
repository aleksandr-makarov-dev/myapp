# Грамматика и PDF из Suomen mestari

Раздел «Грамматика» настроен в `zensical.toml`. Стартовая страница —
`docs/grammar/index.md`, страница учебника — `docs/grammar/suomen-mestari.md`.
Пока PDF не добавлены, страница показывает сообщение без пустого iframe.

## Добавить первый PDF

1. Сохраните страницы учебника в `docs/assets/grammar/suomen-mestari/kpt.pdf`.
   Лучше использовать короткие имена латиницей без пробелов.
2. В начале `docs/grammar/suomen-mestari.md` замените `pdfs: []` на список:

   ```yaml
   pdfs:
     - title: "Suomen mestari 1 · KPT · страницы 42–43"
       file: assets/grammar/suomen-mestari/kpt.pdf
       page: 1
   ```

   Название и номера здесь приведены для примера: укажите свой том, тему и страницы.

3. Выполните `zensical serve` для локального просмотра или `zensical build --clean`
   для проверки сборки. Если Zensical ещё не установлен, создайте виртуальное
   окружение и установите его по [официальной инструкции](https://zensical.org/docs/get-started/).
4. Добавьте Markdown, PDF и остальные изменения в Git. Существующий workflow
   GitHub Pages соберёт сайт после push в `main` или `master`.

`file` задаётся относительно **`docs/`**: без начального `/`, без `docs/` и без
`../`. Шаблон переводит путь в корректный URL, в том числе для GitHub Pages
с префиксом `/myapp/` и для страниц на разной глубине.

`page` — начальная страница **внутри PDF**, начиная с 1. Она может не совпадать
с напечатанным номером в учебнике. Поле необязательно: по умолчанию открывается
первая страница. Поддержка перехода `#page` зависит от PDF-просмотра браузера.

## Несколько PDF на странице

Добавьте несколько записей в `pdfs`. Для каждой появятся заголовок, кнопки
«Открыть PDF» и «Скачать PDF», а также встроенный просмотр:

```yaml
pdfs:
  - title: "KPT"
    file: assets/grammar/suomen-mestari/kpt.pdf
  - title: "Местные падежи"
    file: assets/grammar/suomen-mestari/location-cases.pdf
    page: 2
```

Весь обычный Markdown страницы отображается перед PDF. Для длинного списка
материалов удобнее создавать отдельные страницы по темам.

## Отдельная страница темы

Создайте, например, `docs/grammar/kpt.md`:

```markdown
---
title: "KPT: чередование согласных"
template: grammar.html
pdfs:
  - title: "Suomen mestari · KPT"
    file: assets/grammar/suomen-mestari/kpt.pdf
    page: 1
---

# KPT: чередование согласных

Краткое описание темы и заметки к правилу.
```

Добавьте ссылку на тему в `docs/grammar/index.md` и пункт внутри «Грамматика»
в `nav` файла `zensical.toml`:

```toml
{ "KPT: чередование согласных" = "grammar/kpt.md" },
```

## Как устроен просмотр

`overrides/grammar.html` наследует существующий `main.html`; обработка Quizlet
сохраняется. PDF загружаются с самого сайта через стандартный `iframe`.
Стили находятся в `docs/stylesheets/grammar.css`. Дополнительные плагины,
JavaScript и внешние сервисы просмотра не нужны. Переходы Zensical с
`navigation.instant` работают без отдельной инициализации.

На некоторых мобильных браузерах встроенный просмотр PDF ограничен; в этом
случае используйте «Открыть PDF» или «Скачать PDF».

Документация Zensical:
[пользовательские шаблоны и CSS](https://zensical.org/docs/customization/),
[навигация](https://zensical.org/docs/setup/navigation/),
[метаданные страницы](https://zensical.org/docs/authoring/frontmatter/).
