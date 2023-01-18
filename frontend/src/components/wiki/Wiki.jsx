import { Box, Grid, List, ListItem, TableBody, TableCell, tableCellClasses, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { initWikiAC } from '../../store/wiki/actionsCreators';
import ReactMarkdown from 'react-markdown'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MARCDOWN = `# Общие правила и распорядок дня

## Ценности школы
Мы - не просто учебное заведение, мы - техническое комьюнити. Мы всегда другу другу помогаем и стараемся сделать обстановку внутри нашего it-сообщества максимально дружелюбной. Пожалуйста, не стесняйтесь обращаться к своим товарищам за помощью и всегда помогайте если вас об этом просят. Делитесь новостями и интересными фактами из мира it, возможно это будет вам полезно в дальнейшем. Развивайте софт-скиллы и коммуникативные навыки, это не только залог успешного обучения, но и неотъемлемые составляющие  карьерного роста в мире it и показатель вашей адаптивности в обществе в целом.

## Распорядок дня

В 9-00 мы собираемся на утренний стендап, где каждый высказывается о том с какими трудностями он столкнулся вчера и какие у него ожидания от предстоящего дня.

В 9-15 начинается утренняя лекция, после окончания которой студенты получают задание на предстоящий день.

С 11-30 примерно до 12 часов преподаватели совещаются между собой и решают как сделать обучение еще лучше и эффективнее. Это не может быть для вас поводом чтобы не задавать вопросы в это время, просто будьте готовы не сразу получить ответ.

С 12-30 до 14 часов у всей школы обед. В это время мы не рекомендуем кодить! Напротив, нам всем будет полезно немного отвлечься и отойти от компьютера. В это время обычно проводятся занятия йогой или бокс.

В 14-00 во все дни кроме пятницы мы собираемся на общий стендап, на котором делимся важной информацией, обсуждаем тех-новости, говорим друг другу спасибо.

С 14 до 17-30 все студенты школы занимаются программированием в парах или по одиночке. В пятницу - групповой проект и командная работа.

В 17-30 мы собираемся на общий стендап чтобы обсудить результаты работы за день

В 18-00 рабочий день преподавателей заканчивается. Помощники иногда остаются дольше, но мы не рекомендуем вам кодить допоздна, здоровый сон и отдых очень важны чтобы поддерживать себя в тонусе.


## Если возникает проблема

В процессе выполнения заданий у вас могут возникнуть трудности. Могут появляться непонятные ошибки или вовсе код может не работать. Поверьте, это нормально. Ошибки возникают у всех и один из навыков, которому мы учимся - это способность их решать. Если прямого ответа на ваш поврос нет в прошедшей лекции, попробуйте погуглить. Скопируйте текст ошибки в поисковик и посмотрите как решили эту проблему другие программисты. То же самое можно сделать и с возникшим вопросом, например если поискать "как преобразовать строку в число js" можно найти множество решений, как хороший так и не очень. Но не стоит тратить на возникающие проблемы слишком много времени, вы рискуете ничего не успеть. Поставьте себе рамки, например в 20 минут. Если за это время вы не можете самостоятельно решить проблему - смело пишите об этом в канал pairs и преподаватель или помощник обязательно вам помогут. Не стесняйтесь задавать вопросы, даже если лично вам ваш вопрос кажется тупым или неуместным, то для нас он точно таким не является. 

## Если что-то не так с заданием

Мы постоянно обновляем и улучшаем задания, стараемся своевременно дополнять и актуализировать информацию, которую вам даём. В таком ритме невозможно предусмотреть всего, и если вдруг мы что-то упустили или вы найдете неточность в описаниях, просто создайте gitHub Issue и мы поправим ошибку. Если это что-то критичное и требует срочных правок, то скажите об этом на стендапе или напишите преподавателю в личку.

## Когда задание выполнено

Когда вы выполнили очередное задание, не забудьте его запушить в git и сделать pull request. Мы смотрим ваши пулл реквесты и даем рекомендации на кодревью. Если студент не делает пулл реквестов то мы считает что он не выполняет задания, потому что не можем видеть прогресс. Когда вы работаете в парах или в команде, назначьте одного человека, который будет ответственным за гит-репозиторий команды и он будет мерджить все ваши изменения.

## Где взять материалы

Основную информацию по текущей теме вы получаете на утренней лекции. Конечно, лекция не может затронуть всех аспектов в рассматриваемой области, по этому мы прилагаем несколько полезных ссылок на общедоступные материалы из сети. Что-то вам предстоит найти самим, особенно если возникнет нестандартная ситуация. Умение гуглить - один из основных навыков любого айтишника. Ну и не забывайте про то, что преподаватели и наставники с удовольствием отвечают на любые ваши вопросы в текстовом чате и видеоконференциях.`

const MARCDOWN1 = `# Памятка для студентов Elbrus Bootcamp 
Главная задача информации, представленной здесь - напомнить об основных правилах. 

## Отвлекающие факторы
Elbrus Bootcamp - зона digital-detox. Мы придерживаемся планирования рабочего времени по принципу "maker's schedule" (подробнее: http://www.paulgraham.com/makersschedule.html).


Никаких телефонов, проверки электронной почты, facebook, twitter, instagram, телевизора, фильмов, роликов на youtube, и потребления любой информации из внешнего мира в течение всего периода обучения. 
Нарушение правила не останется незамеченным (если серьезно, это негативно влияет на образовательный процесс). Систематические нарушители будут наказаны исполнением импровизированного танца перед всей группой.
Хотите побыть в уединении? Воспользуйтесь наушниками. Таким образом, если видите студента или преподавателя в наушниках, не нарушайте личное пространство другого. Есть лишь одно оправдание - что-то загорелось, вы пытались потушить, но не смогли и вам нужна помощь друга. 


## Пропуски занятий
**Что делать, если я опаздываю / пропускаю учебный день / 
болею / не хочу приходить?**


Студенты Elbrus Bootcamp руководствуются тремя ценностями: честность, доброта и самосохранение. В случае болезни или форс-мажорных обстоятельств, которые требуют личного участия, сообщите об отсутствии студентам Elbrus или преподавателям.

Допустимо пропустить один учебный день. Но вы должны понимать:
Это увеличивает вероятность того, что придеться пройти весь курс с начала.
Вы можете прослушать Фазу еще один раз. Однако неудовлетворительная посещаемость повторного курса означает автоматическое отчисление.



## Надлежащее использование пространства
Держите рабочий стол в чистоте.
Сохраняйте свое рабочее пространство в опрятном виде.
Не ешьте за компьютером!




## Философия сообщества
Мы прилагаем максимум усилий, чтобы сделать среду Elbrus безопасной и комфортной для всех. Поэтому есть некоторые обязательные правила для тех, кто хочет стать частью сообщества 
Bootcamp:


Быть онлайн утром и после обеда.
Находиться в Elbrus в течение всего времени обучения, и сообщать об отсутствии или опоздании.
Оставаться на связи с группой, когда опаздываете или отсутствуете.
Быть добрыми и вежливыми с одногруппниками и преподавателями.
Не принимать пищу в непосредственной близости от компьютера.
Не употреблять алкогольные напитки в учебное время.


P.S. Вся команда Elbrus Bootcamp готова помочь в любое время и сделать ваше обучение максимально комфортным. Также, смело обращайтесь за советом и поддержкой к другим участникам кэмпа.`;

const MARCDOWN2 = `**Инструкция по парному программированию**
1. Работать в 1 форке репозитория. Напарника нужно добавить в Colloboratos репозитория.
1. Роли меняются по таймеру каждые 30 минут
1. Использовать 1 компьютер (второй нужно выключить, иначе можно уйти в соло-групповую работу) и монитор
1. Договариваться о времени обеда. В это время не работать по одиночке, а ждать напарника.
1. Менять роли Драйвера и Навигатора
1. *В конце парного программирования дать обратную связь что стоит улучшить в следующий раз.*

**Преимущества парного программирования:**
1. **Обмен опытом:** Часто бывает, что сидя в паре вы узнаете про пару новых горячих клавиш, интересные утилиты для ускорения работы. В любом случае, наблюдая за тем, как программируют другие вы сами постоянно учитесь.
1. **Знания о системе:** Постоянная смена пар способствует распространению знаний о разных частях системы внутри команды. Это дает возможность понимать как система развивается, улучшать дизайн системы, не дублировать логику.
1. **Коллективное владение кодом:** Когда все участвуют в написании всех частей системы, то не может идти речи о персональном владении классом или сборкой.
1. **Наставничество:** Все мы когда-то начинали программировать. Как показала практика самое простое вливание в проект происходит в процессе парного программирования.
1. **Больше общения:** Общение внутри команды помогает выстраивать доверительные отношения. Стендапы и ретроспективы добавляют в общения в повседневную работу, но это не сравнить с возможностями парного программирования.
1. **Стандарты кодирования:** Сидя в паре, постоянно передавая клавиатуру и меняя пары, программисты распространяют знания о том, какие стандарты кодирования приняты на проекте. Вам уже не понадобится прикручивать автоматические инструменты для проверки качества кода.
1. **Улучшение дисциплины:** Сидя в паре, хочется показать свою заинтересованность и уровень подготовки партнеру. И довольно трудно временно переключиться на соц. сети, чтобы полистать последние забавные картинки.
1. **Сопряжение потока:** Один программист спрашивает у другого «Что мы сейчас решаем?» и они оба начинают погружаться в задачу. Такой подход может приводить к сопряжению состояния потока, что увеличивает продуктивность в разы.
1. **Меньше прерываний:** В паре вам приходится меньше прерываться на сторонние факторы, т.к. время двух человек ценнее, чем одного, их работа становится в 2 раза дороже.

**Анти-паттерны**
1. **Наблюдай за Мастером:** Это происходит, когда в паре есть программист, который считает (или даже является) гуру в своей области. Вопросы менее опытного разработчика о коде, который генерируется Мастером, не получают ответа. Возможен вариант, когда его постоянно посылают почитать в Google. Мастер не спешит отдавать клавиатуру напарнику, а когда тот добирается до нее, Мастер теряет всякий интерес к процессу.
1. **Диктатор:** Один из разработчиков в паре всегда занимает жесткую ультимативную позицию по поводу всех решений, которые касаются текущих задач. В такой ситуации не может идти речи о взаимной помощи или обучении в паре.
1. **Сходи за кофе:** Пара садится за компьютер. Один из разработчиков берет клавиатуру и начинает писать код. Говорит напарнику: «Пока я пишу код, ты сходи и налей нам кофе». Это нарушает базовую идею о взаимной вовлеченности программистов в процесс.
1. **Молчаливые партнеры:** Напарники не общаются друг с другом и не комментируют свои действия и решения по ходу работы. При отсутствии обратной связи смысл пары теряется.
1. **Разделение задач за одним столом:** Программисты садятся в пару, берут два компьютера за одним столом (настольный и ноутбук) и начинают параллельно работать.
1. **Неудобно сидеть:** Самая частая причина усталости при работе в паре — неудобное положение клавиатуры и монитора для того, кто сейчас «водитель». Когда клавиатура переходит от одного программиста к другому, получивший ее не перемещается в центр стола, а нагибается к клавиатуре, тем самым создавая себе трудности при работе.
1. **Партнер занят своим делом:** Один из партнеров во время работы в паре отдаляется от места работы, проверяет свою почту и т.д.
1. **Свои настройки окружения:** Каждый раз, когда управление переходит от одного партнера к другому, начинается перенастройка окружения: закладок, шрифта и т.д.
1. **Свой стиль:** Каждый из партнеров придерживается своих стандартов кодирования, что вызывается бурные дискуссии и ужасно отформатированный код.`;

const MARCDOWN3 = `# Парное программирование

Парное программирование - метод разработки программного обеспечения, при котором два программиста работают совместно на одной рабочей станции. Один - "разработчик" пишет код, другой - "наблюдатель", проверяет каждую строку по мере ввода. Время от времени программисты меняются ролями.

## Рекомендации по эффективному парному программированию

Создание технического партнерства
1. Знакомство, выстраивание контакта:
Пообщайтесь с партнёром на общие темы: "Как дела? Как настроение?"
Выясните есть ли что-то, что может помешать совместной работе?

2. Алгоритм парного партнерства и совместного обучения:
Распределите роли "разработчика" и "наблюдателя". Определите временные интервалы для смены зон ответственности.
Какие факторы повысят эффективность совместной работы?
Что может повлиять на партнерство негативно?
Как обучаетесь и справляетесь с поставленными задачами обычно?

3. Совместное планирование:
Определите главные технические цели текущего дня. Или конкретную область знаний, которую необходимо исследовать.
Работая вместе вы достигните результата быстрее и эффективнее, чем действую в одиночку?

4. Поиск сильных и слабых сторон:
Как ваша пара оценивает собственные силы в решении поставленной задачи?
Если обозначить разные уровни знаний в начале работы и распределить зоны ответственности, каждый будет востребован и вовлечен.

5. Планирование исхода событий:
Подумайте как, отпразднуете успех и разработайте план на случай неудач и затруднений (и, конечно, идите до конца!)


Важные правила парного программирования

1. Закройте социальные сети, мессенджеры, электронную почту и отключите все уведомления.

2. Используйте блокноты, доски и флипчарты для записи заметок, это отличный инструмент. 

3. Дискутируйте, решайте промежуточные задачи, фиксируйте вопросы в процесс совместной работы, чтобы позже задать их преподавателю.

4. Не забывайте меняться ролями и практикуйте технику "Pomodoro" (25 минут - активность, 5 минут - отдых). 

5. Старайтесь избегать ненужных разговоров с одногруппниками во время работы. Однако, вы можете присоединиться к другим командам, поделиться знаниями и обсудить стратегии решения задач.

6. Периодически проверяйте выполнение вышеперечисленных пунктов, инспектируя личную эффективность. 

7. Если застряли на месте или потеряли много времени на определенном этапе, обсудите с инструктором способы выхода из тупика. 

Совместная работа - огромная часть опыта, который можно получить в Elbrus. Парное программирование - важный образовательный навык, такой же как любой технический. Работать в партнерстве не просто, поэтому переходите к практике как можно быстрее и прикладывайте ежедневные усилия. 
Однако, возможны трудности из-за особенностей характера и личных качеств участников. Поэтому, если чувствуете, что работа с партнером чрезвычайно сложна и мешает процессу обучения, пожалуйста, сообщите об этом преподавателю.

Общие рекомендации. Обратная связь 
Доносите идеи, указывайте на ошибки, давайте рекомендации конструктивно, конкретно и экологично.
Уважайте вклад партнера в процесс решения поставленных задач.
Будьте искренни и предметны, давая положительную обратную связь.
`;

const MARCDOWN4 = `## Работа над командным проектом

### Общие рекомендации

* Спланируйте работу команды, распределите роли
* Продумайте алгоритм решения поставленной задачи
* Распишите, а лучше нарисуйте этапы работы над проектом
* Не работайте одновременно с одной задачей, решайте задачи параллельно

### Git

* Один человек делает форк задания
* Другие делают клон созданного форка
* Добавьте всех в коллабораторы
* Каждый работает в своей ветке
* Делайте merge как можно чаще!

### Как делать merge?

* git add -A
* git commit -m ""
* git push origin mybranch
* На github.com нажать "New pull request"
* Попросить товарища проверить pull-request

### Во сколько делать merge?

* 12:00
* 14:00
* 16:00
* за 15-20 минут до показа

### Презентация проекта

* В 17:00 на общей конференции каждая команда по очереди презентует свой проект.
* Нужно показать саму программу и код, рассказать об алгоритме работы, с какими трудностями столкнулась команда.
* Будьте готовы отвечать на вопросы других команд`;

const MARCDOWN5 = `Команды Git.

git init                   // Создать git-репозиторий в текущей папке.
git status                 // Отобразить состояние текущий ветки репозитория в текущей папке.
git pull                   // Копировать все файлы и папки текущей версии текущий ветки
                              с удалённого сервера в текущую папку и попытаться сделать мёрдж этих файлов.
   [АлиасСервера]          // Если задан, позволяет затянуть изменения не с текущего сервера/ветки, а с произвольного.
                              Используется в паре с [АлиасВетки].
   [АлиасВетки]            // Если задан, позволяет затянуть изменения не с текущего сервера/ветки, а с произвольного.
                              Используется в паре с [АлиасСервера].

git checkout               // Переключиться на ветку с именем [ИмяВетки] или на коммит с ID [IDКоммита].
   [ИмяВетки]              // 
   [IDКоммита]
git branch                 // Отобразить или удалить (если задан ключ -d) список веток на удалённом сервере git.
   [ИмяВетки]              // Если задан, создать или удалить (если задан ключ -d) локальную ветку с именем [ИмяВетки].
   -r                      // Отобразить или удалить (если задан ключ -d) список веток на удалённом сервере git.
   -a                      // Отобразить или удалить (если задан ключ -d) список всех веток
                           (локальных и на удалённом сервере git).
   -d                      // Удалить ветку с именем [ИмяВетки].

git add                    // Дабавить файл с именем [ИмяФайла] в индекс локального репозитория (в область stage).
   [ИмяФайла]
   .                       // Добавить все добавленные/изменённые файлы в индекс. Используется вместо [ИмяФайла].
git commit                 // Создать коммит в локальный репозиторий. Все застейдженные файлы будут закомичены.
                              Откроется окно для ввода комментария. После того как файл с комментарием сохранён и закрыт.
                              будет осуществлён коммит.
   -m "[ТекстКомментария]" // Если задан, то позволяет указать комментарий к коммиту прямо в в тексте комманды.
git push                   // Загружает все локальные закоммиченные изменения на сервер.
   [АлиасСервера]          // Если задан, позволяет загрузить изменения не на текущий сервер/ветку, а на произвольный.
                              Используется в паре с [АлиасВетки].
   [АлиасВетки]            // Если задан, позволяет загрузить изменения не на текущий сервер/ветку, а на произвольный.
                              Используется в паре с [АлиасСервера].

git reset --soft HEAD^     // Отменить последний коммит, т.е. перевести файлы из закоммиченных в индекс (в stage).
git reset                  // Отменить stage (обратить git add),
                              т.е. перевести файлы из индекса в список модифицированных файлов.
git reser --hard           // Отменить все изменения, т.е. вернуть файлы к состоянию последнего коммита.`;

const arrWiki = [MARCDOWN, MARCDOWN1, MARCDOWN2, MARCDOWN3, MARCDOWN4, MARCDOWN5]

export default function Wiki() {

    const dispatch = useDispatch();

    const wiki = useSelector((store) => store.wiki);
    console.log("🚀 ~ file: Wiki.jsx:34 ~ Viki ~ wiki", wiki)

    const[idxPage, setIdxPage] = useState(0);

    function getWikiPage(item){
      setIdxPage(item)
    }

    useEffect(() => {
        dispatch(initWikiAC());
      }, []);

      // let test = wiki[idxPage]?.page
      // console.log("🚀 ~ file: Wiki.jsx:46 ~ Viki ~ test", test)

      // const MARCDOWN1 = test;

      // const MARCDOWN2 = `${test}`; 
      

  return (
    <Box>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={4}>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
          >
        <TableBody>
            {wiki.map((item, idx) =>
              {return (
              <StyledTableRow key={crypto.randomUUID()}>
                  <StyledTableCell style={{ cursor: "pointer"}} align="center" component="th" scope="row" onClick={() => {getWikiPage(idx)}}>
                      {item.name}
                  </StyledTableCell>
              </StyledTableRow>
              )}
            )}
        </TableBody>
          </List>
      </Grid>
        <Grid item xs={12}>

            {/* {test} */}
            <ReactMarkdown>{arrWiki[idxPage]}</ReactMarkdown>
        </Grid>
      </Grid>
    </Box>
  )
}
