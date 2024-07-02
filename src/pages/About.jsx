import { useContext, useRef, useState } from "react";
import { debug } from "../assets/function/functions";
import { User } from "..";
import Carousel from "react-multi-carousel";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa0, faArrowAltCircleLeft, faArrowCircleLeft, faArrowCircleRight, faBackward, faCircleXmark, faForward, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { responsive } from "./Home";
import { bagrutInfoDict } from "./Bagrut";
import './Bagrut.css';
import './About.css';
import { useNavigate } from "react-router-dom";


const aboutDict = (callBack) => ({
    item1: {
        img: undefined,
        title: <h3>למה זה חשוב ?</h3>,
        promot: <p>האם כדאי לי ללמוד 5 יחידות
            ומה בעצם יצא לי מזה?</p>,
        body: <p><b>התשובה הראשונה – התשובה הפרקטית:</b><br />
            מכיוון שסטטיסטית , תלמידי 5 יחידות מתמטיקה מקבלים תפקידים טובים ומעניינים יותר במשק מאשר תלמידי 4 או 3 יחידות מתמטיקה.


            מכיוון שהשכר הממוצע של תלמידי 5 יחידות מתמטיקה גבוה ה 41% מתלמידים שאינם בעלי 5 יחידות.

            ואם בעניין השכר – אז אנחנו יודעים ,כי לצערנו , יש חוסר שוויון בין הגברים לנשים בנושא השכר.

            אחת הדרכים העיקריות להגיע לתפקידים שוויוניים מבחינת הנשים , היא להיות בוגרות 5 יחידות מתמטיקה, כי אז הן מגיעות לתפקידים שבהם השכר

            שלהן אינו שונה מהגברים באותו התפקיד.<br />

            <b> התשובה השנייה – התשובה הפילוסופית:</b><br />

            מתמטיקה היא השפה שבה אנו , בני האדם מתארים את המציאות סביבנו.  את הטבע (פיזיקה) , כימיה , ביולוגיה

            והיא השפה שבעזרתה אנו בונים את העולם הטכנולוגי שאנחנו כל כך תלויים בו , לכן זו השפה גם של המהנדסים.

            מכאן , כל מי שרוצה להיות חלק מהעולם הזה, עולם המדע או העולם הטכנולוגי , חייב לא רק לדעת מתמטיקה , אלא גם לאהוב אותה ,

            לאהוב אותה מכיוון שהיא היסוד שעליו אנחנו מבססים את ההתקדמות האנושית.</p>
    },
    item2: {
        img: undefined,
        title: <h3>למי זה מתאים?</h3>,
        promot: <p>לא צריך להיות הייטקיסט כדי להצליח ב 5 יחידות, אבל 5 יחידות יעזרו להצליח בהייטק</p>,
        body: <p><b> לא אגזים אם אגיד – לכולם </b><br />

            יש כאלה שלימוד מתמטיקה 5 יחידות מהווה קושי משמעותי ואתגר גדול , ויש כאלה שאתגר לימוד המתמטיקה הוא פשוט יותר ,  אבל אין אדם שלא יכול לדעת (ואפילו לאהוב) מתמטיקה.

            חשוב שתדעו שחווית ההצלחה/כישלון לא תמיד תלויה רק בכם, אלא גם חלקו של מי שמדריך אתכם.

            לכן אני מתייחס לתפקיד שלי ביראת כבוד ורצינות.

            חשוב לי להיות שותף להצלחה שלכם ואני רואה את עצמי כחלק לא קטן במסע הזה, מסע שאני רואה אותו כמסע משותף.</p>
    },
    item3: {
        img: undefined,
        title: <h3>האם תרגול שווה הצלחה?</h3>,
        promot: <p>מתמטיקה לא דורשת המון תרגול,
            ועוד סודות שלא יגלו לכם בבי״ס  <FontAwesomeIcon className="m2" icon={faFaceSmileWink} /></p>,
        body: <p>700 עמודים, ומה שמפתיע, זה שהוא רק אחד מתוך כמה ספרים. מה?! באמת יש כל כך הרבה חומר? באמת צריך לפתור כל כך הרבה תרגילים? מה זה הטירוף הזה? בבית הספר מרגילים אותנו לתרגול אינסופי בתור שיטה להפנים את החומר. פה חשדתי 🙂 האמת היא שזאת לא דרך טובה ללמוד. הרעיון הוא לעבוד חכם ומדויק במקום לתרגל ולתרגל. למה הכוונה?


            לבחור נכון את הדוגמאות דרכן לומדים (זה תפקיד המורה כמובן), ולקחת קומץ קטן ואיכותי של דוגמאות שניתן לסובב בוריאציות שונות ולחבר זו לזו כדי להבין את כל מה שצריך.

            ככה אנחנו בונים אבני יסוד חזקות: הבנה תיאורטית מוחשית וטובה, ואז אנחנו כבר לא זקוקים לשיטה של תרגיל ועוד תרגיל ועוד תרגיל… קחו אנלוגיה: צייר טוב יודע לערבב מ 3 צבעי יסוד את כל הצבעים שהעין מסוגלת לקלוט. צייר שלא מודע לערבובים ולוריאציות צריך לקנות המון המון צבעים כדי לתאר את המציאות על הבד. אז בפעם הבאה שאתם נתקלים בקורס שמתהדר בכמה הוא ארוך ומלא תרגול.</p>
    },
    item4: {
        img: undefined,
        title: <h3>מה הרציונל שלנו?</h3>,
        promot: <p>מי אנחנו?
            ולמה הקורס שלנו טוב יותר</p>,
        body: <p>לפני שאתם מתחילים ללמוד מתמטיקה איתי,
            אני בטוח שיש לכם המון שאלות<br />
            למה ללמוד כאן ? <br />
            כמה אני צריך להשקיע כדי להצליח בבגרות ? <br />
            איך לומדים כאן ?<br />
            איך אני צריך להרגיש כשאני לומד ?<br />
            מי המורה שלי ?<br />
            אז…נתחיל לאט לאט? ואולי נתחיל מהסוף
            <br /><br />
            קוראים לי שי , שי חכימי , ואני מלמד מתמטיקה ופיזיקה ברמת 5 יחידות לבגרות החל משנת 2001
            אבל אם אגיד 19 שנה, בעוד שנה זה לא יהיה רלוונטי
            הפכתי למורה למתמטיקה  ?
            <br /><br />

            זה סיפור די מעניין וקצת מוזר , אז , אני מבטיח שאספר לכם בסרט אחר , למי שרוצה מוטיבציה ללמידה , ואולי להבין מה המתמטיקה מסוגלת לעשות לנו.
            נחזור לשאלה : למה ללמוד כאן ?
            היום יש שני סוגי למידה עיקריים:
            למידה בכיתה , מולי עומד מורה – ואפילו מורה מעולה , אבל…אני מחויב להגיע לכיתה , כשנוח וכשלא נוח לי , חולה , או בריא , מצוברח או שמח.
            אתם יודעים מה … תהליך למידה הוא תהליך כל כך אינטימי ועדין , שאי אפשר להכריח להירתם לו בשעות קבועות , ולא תמיד בא לי להיות מרוכז למפגשים ארוכים של כמה שעות, ואם אני רוצה לשמוע את ההסבר שוב ? הרי בתהליך למידה נכון , אני לא אמור לשמוע הסבר ומייד להבין אותו ב 100% , ועל זה מסתמכים בלמידה פרונטלית , “הסברתי לך כרגע , בוא ותתרגל” , מה פתאום !!! כבר אמרתי לכם שתהליך למידה הוא לא תהליך מכאני , לפעמים אני צריך הפסקה לעבד נתונים , לפעמים אני רוצה לשמוע שוב את ההסבר כי פיספסתי מילה אחת או שתיים , למה להגביל את טבע הלמידה הנכון כי בימי הביניים המציאו את המסגרת הכיתתית (אכן , בתקופת ימי הביניים , למידה היתה מורה מול כיתה , לפני כן הלמידה היתה מורה-אומן מול תלמיד-מתמחה) וזה רק העניין הפרטי מה בנוגע לזה שסביבי יושבים עכשיו בממוצע 30 או 40 תלמידים. לא תמיד נוח לי לשאול עם כל כך הרבה תלמידים על הראש , או שאין תמיד את השקט שאני צריך כדי ללמוד.
            אתם משלמים מחיר מאוד מאוד יקר אני לא רוצה להיכנס לסכום , כי הוא מאוד משתנה ממכון למכון , וגם בתוך המכון. אם תלמיד לקח כמה קורסים , המחיר יכול לרדת ב 40% רובם משלמים דרך הפיקדון , והם לא רואים הזה כסף אמיתי , וכמובן שיש שונות בין המכונים השונים. והכי בעייתי , המכינות של המכללות – שם זה כמעט בחינם, אני לא התכוונתי רק למחיר הכספי , התכוונתי גם למחיר הכולל שעליו דיברנו : זמן , פקקים, נוחות…. כדי ללמוד מאותו המורה המעולה שנמצא מולכם , ואתם רוצים וצריכים את ההסבר שלו , לא בא לכם על קורס אינטרנטי קר שבו אין ממש הסבר עמוק , אין את האפשרות לשאול שאלות , אין למי לפנות. וזה מביא אותי לסוג הלמידה השני שקיים…
            קורסים מכוונים , ז”א קורסים באינטרנט. שם אנחנו פותרים את כל הבעיות של המיקום, פקקים, כיתות גדולות, יש לי חשק היום , אין לי חשק היום… אבל , מה המחיר ? גם כאן לא התכוונתי למחיר כספי , אולי יש לך מילה אחרת ? בדרך כלל אלה קורסים טכניים מאוד , ללא הסברי עומק , ואתם יודעים מה…אין ממש מישהו שמדבר אלי , אני לא מרגיש שהמורה הוא באמת מורה שלי. במקרה אחד , השיעור הוא צילום של שיעור בכיתה , ובמקרה אחר , מדבר אלי קול דרך המחשב. מי יכול להתחבר לסתם קול שמדבר דרך המחשב ? מי יכול לבצע פעולה כל כך עדינה ואינטימית על ידי הסבר קר בכתב יד.
            אז… מה אני מציע ?
            בואו ונשלב את הטוב שבשתי השיטות
            הקורס הוא קורס אינטרנטי , ולכן משחרר אתכם מפקקים , זמן מבוזבז , שעות לא נוחות , רעש , חוסר באינטימיות , התמודדות עם תלמידים נוספים.
            אבל…זה קורס שמוקלט בבית , ברוגע ,עם המון המון נסיון וזמן חשיבה של – איך להפוך כל הרצאה וכל פתרון למדוייק מאוד כך שלא אבזבז לכם את הזמן עם פתרון לא מדוייק. , הקורס נכתב במחשב , כדי שתבינו כל פסיק ו…כדי שאוכל לדייק בכל פסיק במהלך הפתרון, לא רק הדיוק , גם השונות המטורפת שיש לי דרך המחשב – צבעים, הדגשות, מסגרות, המון אנימציות שאי אפשר להראות על לוח רגיל בכיתה. קורס שבו אתה רואה ומכיר את המורה שמלמד אותך, אתם מכירים אותי , את הפרצוף המכוער שלי , בטח תבלו איתי לפחות כמו הזמן שאתם מבלים עם הבני/בנות זוג שלכם. ההסברים שאתה מקבל הם לא רק הסברים טכניים , אלא עם משמעות פילוסופית והסתכלות על היישומים בעולם הפיזיקה של אותם כלים מתמטיים שעליהם אנחנו לומדים. אפשרות לשאול שאלות. ואני מדגיש – יש לכם את האפשרות לשאול שאלות, לקבל תשובות ואפילו לשמוע את השאלות והתשובות של תלמידים אחרים שמשתתפים איתכם בקורס.
            ממש לא הייתי פותח איתם ערוץ של וואטצאפ
            <br /><br />
            נמשיך לשאלה הבאה: ‘ כמה אני צריך להשקיע כדי להצליח בבגרות ? ‘
            אני בטוח שראיתם ספר מתמטיקה לבגרות.
            מה אתם זוכרים ממנו ? 700 עמודים , ומה שמפתיע , זה שהוא רק אחד מתוך כמה ספרים.
            מה ????
            באמת יש כל כך הרבה חומר ?
            באמת צריך לפתור כל כך הרבה תרגילים ?
            מה זה הטירוף הזה ? מתי נפתחה התחרות ‘למי יש יותר גדול’ סימנת את המשפט ‘למי יש יותר גדול’ אבל לא אמרת על זה כלום בסרטון. זה גס מידי ? בין ספרי המתמטיקה ?
            אני חושב שמישהו שכח את האמרה ‘מרוב עצים לא רועים את היער’ (ובאמת , המון עצים צריך בשביל כמות הספרים הללו)
            האם אני באמת צריך לפתור כל כך הרבה תרגילים ?
            בספרים האלה יש אלפים רבים של תרגילים , באמת צריך לפתור אלפי תרגילים ? אני עשיתי באוניברסיטה תואר בפיזיקה – זה לא מדעי הדשה , נכון ? , נראה לכם שפתרתי אלפי תרגילים בכל קורס ????? אולי בכל התואר פתרתי כמה מאות , מה חוסר ההגיון הזה ?
            אולי אני צריך לפתור כמות מסויימת של תרגילים בשביל להפנים את החומר,
            אבל לא צריך יותר משניים שלושה תרגילים בכל תת פרק כדי ללמוד נושא חדש,
            כי ברגע שאבני היסוד שלנו הן אבנים חזקות – ז”א ההבנה התיאורטית שלנו היא מוחשית וטובה , אנחנו כבר לא זקוקים לגישה הלא רלוונטית של תרגיל ועוד תרגיל ועוד תרגיל ……
            קחו אנלוגיה טובה :
            צייר טוב יודע לערבב מ 3 צבעי יסוד את כל הצבעים שהעין מסוגלת לקלוט , לכן צייר שהוא אומן , צריך מספר מאוד מצומצם של צבעים כדי לתאר יום מרהיב על הבד , צייר מתחיל שלא מודע לערבובים ולוריאציות השונות של שלושת הצבעים זקוק לקנות המון המון צבעים כדי לתאר את המציאות על הבד – תהיו ציירים טובים , אל תזדקקו ליותר מידי תרגילים כדי להבין את המציאות , תפנימו את הוריאציות שאפשר לקבל ממספר מועט של תרגילים
            אז בואו ונשאיר לרגע את התרגול האינסופי שהרגילו אתכם אליו בבית הספר ובקורסים השונים.
            בואו נלמד עם דוגמאות מעטות ומדויקות את המתמטיקה , ובסוף , נתרגל עם שאלות הבגרות עצמן ונראה איך שלא צריך יותר מידי תרגול באמצע הלמידה , מה שחשוב זה שנכיר את השפה, האופי וההיסטוריה של זה שבוחן אותנו , נכון ? איך נוכל לעשות זאת ? על ידי התמקדות בשאלות הבגרות של השנים האחרונות.
            ו…אם תרצו עוד תרגול , אחרי הלמידה שלנו כאן , תוכלו ללכת לספרים ולתרגל כמה שרק בא לכם. – חותך את המשפט הזה, מסכים איתך.
            אני חוסך לכם בזמן על ידי כך שאנחנו לא צריכים לפתור מאות תרגילים שרובם מיותרים.
            חוסך לכם בזמן על ידי כך שאני לא מביא אתכם לשבת בכיתה ולשרוף זמן בדרכים וזמן בכיתה שאפשר לדייק את הלימוד מכאן.
            למה כל כך חשוב לי לחסוך לכם בזמן ?
            כי ככה לומדים היום.
            יש לכם כל כך הרבה ללמוד , אם ‘תשרפו’ חצי שנה על תרגול אינסופי….מתי יהיה לכם זמן ללמוד עוד כדי לשנות את העולם ?
            אני חושב שלגבי שאר השאלות :
            איך לומדים כאן ?
            איך אני צריך להרגיש כשאני לומד ?
            מי המורה שלי ?
            לכולן יש חשיבות אם אנחנו מתכוונים לשבת יחד , אז נקדיש לכל אחת מהן שיחה נפרדת.</p>
    },
    item5: {
        img: undefined,
        title: <h3>האם כדאי לי ללמוד 5 או 4 יחידות?</h3>,
        promot: <p>האם עדיף 100 ב-4 יחידות,
            או 70 ב-5 יחידות?</p>,
        body: <p>יש הבדל ניכר בין רמת הידע וההבנה שנדרשת מתלמיד 5 יחידות במתמטיקה לזו שנדרשת מתלמיד 4 יחידות.<br />
            הצבא יודע את זה, האקדמיה יודעת את זה וגם המעסיקים בשוק העבודה יודעים את זה ובנינו, גם אתה יודע את זה.<br />
            לכן אנחנו ב 5Math מעודדים כל תלמיד שמרגיש שהוא רוצה ומסוגל לגשת ל 5 יחידות. לגשת לאתגר בסקרנות, התלהבות ונחישות.<br />
            נציין שגם בגרות של 4 יחידות בציון גבוה היא נקודת פתיחה מעולה. <br />
            מה ההישגים הממוצעים של בוגרי 5 יחידות ביחס לאחרים ? <br />

            השכר הממוצע של עובדים בעלי בגרות של 5 יחידות במתמטיקה גבוה ב 41% משכרם של עובדים שאינם בעלי 5 יחידות.


            5 יחידות מתמטיקה הוא סף הכניסה הבסיסי לכל המקצועות המדעיים המבוקשים (רפואה, הנדסת חשמל/ מכונות/ מחשבים, פיזיקה).

            לתלמידים שהצליחו איכשהו להיכנס למקצועות אלו עם פחות מ 5 יחידות סיכוי נמוך משמעותית לשרוד את הלימודים מבלי לנשור

            לעומת תלמידי 5 יחידות.<br />

            לכן אני ממליץ לכל מי שרוצה ויכול – לעשות את המאמץ, וללכת על 5 יחידות אפילו במחיר של התפשרות על הציון הסופי. בסופו של דבר,

            5 יחידות במתמטיקה זה הישג שמראה על הבנה מתמטית מעמיקה ולכן הוא לגמרי פותח דלתות בהמשך.</p>
    },
    item6: {
        img: undefined,
        title: <h3>איך מרגישים כשלומדים אצלינו?</h3>,
        promot: <p>איך מרגישה למידה נכונה? <br />
            איך עושים ״את זה״ נכון?</p>,
        body: <p>נתחיל מאופי החשיבה שלנו,
            אנחנו צריכים להכיר בכך שאנחנו נמצאים תחת שתי צורות חשיבה שונות:
            <br />
            חשיבה ממוקדת וחשיבה פזורה
            החשיבה הממוקדת ברורה לכולנו , כי מאז גילאי הגן וכיתה א’ לימדו אותנו לנסות ולהתרכז. בחשיבה הממוקדת אנחנו נכנסים לעובי הבעיה , מפרקים אותה לרכיבים ומנסים להבין את נקודת הכשל שלה.
            <br /><br />

            החשיבה הפזורה מתרחשת כשאני רגוע יותר ונותן למחשבה שלי לנדוד קצת ,
            מעיין הפסקה קטנה מהחשיבה המאומצת. אבל מצב זה לחלוטין אינו מצב של בטלה , במצב זה אני מאפשר למערכת המורכבת של המוח שלי לעבד נתונים ולהתקשר בין חלקיה השונים , בכך אני רותם את כל ההוויה שלי לפתרון הבעיה. כמובן שישיבה בסתלבט לא תפתור לנו בעיות במתמטיקה , אבל עבודה משותפת של שתי צורות החשיבה הממוקדת והפזורה צריכות לעבוד לסירוגין.החשיבה הממוקדת לבדה נורא בעייתית , כי זה תהליך שואב , שלא מאפשר לי להבחין בדרכים נוספות והעמקה בתהליך חשיבה אחד יכול להוביל אותנו לתסכול לא קטן. אנחנו צריכים , בהמלך התרגול , ללמוד איך להרפות לפעמים ולאפשר למחשבה הפזורה לקחת אותנו למקומות נוספים בתרגיל , לא סתם בקריקטורות , רעיונות גדולים מופיעים לפרצוף משתומם בצורה של מנורה מעל הראש , ולא אצל מישהו שקודח וחורט על עשרות דפים.
            <br /><br />

            אז זה מה שאנחנו צריכים , לרכוש את המיומנות הזו לג’נגל בין שתי צורות החשיבה.
            <br />
            טוב , למדנו על תהליכי חשיבה ,
            אבל איך אני יכול ליישם את זה בלימוד המתמטיקה שלי ?
            בגישה , הגישה לתרגילים צריכה להיות מאוד עדינה ורגועה , אם תתקפו תרגיל במתמטיקה – ז”א , ישר תרימו את העיפרון ותתחילו בגישה מאומצת , יש סבירות שהתרגיל לא ייענה לחיזור שלכם.
            כשאני בא לתרגיל , אני מתחיל משירבוט נחמד שלו על הדף , כותב את הנתונים , באופן כזה אני , כמעשה לא מודע , מגייס כוחות וחלקים במוח שלי שנחסמים כאשר אני בא לפתור תרגיל בלחץ.
            <br />
            אל תשכחו את הסיבה שבגללה אתם לומדים , אתם רוצים להיות אנשים טובים יותר , עם ביטחון עצמי גבוה יותר , להתקבל ללימודים באוניברסיטה
            <br />
            דבר נוסף שקשור לרגשות, הרגשות ותכונות – עקשנות.
            עקשנות חשובה יותר מאינטליגנציה !
            תהיו עקשנים , תעבדו באופן עקבי והמוח שלכם יתאים את עצמו לדרושות הגבוהות שלכם ממנו</p>
    },
    item7: {
        img: undefined,
        title: <h3> איך בנוי מבחן הבגרות ל 5 יחידות לימוד?</h3>,
        promot: <p>ממה מורכב שאלון הבגרות ? כמה זמן יש למבחן? ועוד שאלות</p>,
        body: <div className="bargrutInfo grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1em' }} >
            <div className="flex columns fill center tStart around">
                <Card
                    style={{ maxWidth: '35em' }}
                    // style={{ backgroundImage: `linear-gradient(45deg,${colorList[Math.floor(Math.random() * colorList2.length)]},transparent` }}
                    className='borderDropBR border' cardID={'bagrutInfoCarusel'} key={'5u1'} boxShadow={false} translateY={false}>
                    <h3 >{bagrutInfoDict.L5.frst.title}</h3>
                    <div className='grid rows tStart'>
                        {bagrutInfoDict.L5.frst.body.map((line, ind) => (
                            <div key={ind} className='flex m1' style={{ alignItems: 'start' }} >
                                <p className='ml1'>{`${ind + 1}.`}</p>
                                {line}
                            </div>
                        ))}
                    </div>
                    <hr
                        // style={{ width: '100%', border: '1px solid var(--themeGrey)', margin: '0.1em' }} 
                        id='horizLine'
                    />
                    <div className='footerBagrutInfo'>
                        {/* <h3 >אז מה היה לנו ?</h3> */}
                        {bagrutInfoDict.L5.frst.footer.map((line, indx) => (
                            <div key={indx}>
                                {line}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="flex columns fill center tStart around">
                <Card
                    style={{ maxWidth: '35em' }}
                    // style={{ backgroundImage: `linear-gradient(45deg,${colorList[Math.floor(Math.random() * colorList2.length)]},transparent` }}
                    className='borderDropBL border' cardID={'bagrutInfoCarusel'} key={'5u1'} boxShadow={false} translateY={false}>
                    <h3 >{bagrutInfoDict.L5.sec.title}</h3>
                    <div className='grid rows tStart'>
                        {bagrutInfoDict.L5.sec.body.map((line, ind) => (
                            <div key={ind} className='flex m1' style={{ alignItems: 'start' }} >
                                <p className='ml1'>{`${ind + 1}.`}</p>
                                {line}
                            </div>
                        ))}
                    </div>
                    <hr
                        // style={{ width: '100%', border: '1px solid var(--themeGrey)', margin: '0.1em' }} 
                        id='horizLine'
                    />
                    <div className='footerBagrutInfo'>
                        {/* <h3 >אז מה היה לנו ?</h3> */}
                        {bagrutInfoDict.L5.sec.footer.map((line, indx) => (
                            <div key={indx}>
                                {line}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            <div className="flex center" style={{ gridArea: '2 / 1 / span 1 / span 2' }}>
                <h4> למבחנים משנים קודמות - &nbsp;
                    <i onClick={callBack}
                        className="pointer darkBlue opacityHover">לחצו כאן</i></h4>
            </div>
        </div>
    }
})

export default function AboutUs({ ...props }) {
    document.title = 'הסיפור שלנו';
    const user = useContext(User);
    const [selectItem, setItem] = useState();
    const navigate = useNavigate();
    const aboutInfoDict = useRef(aboutDict(() => navigate('/BagrutOfficial')));
    
    const nextButton = useRef();
    const prevButton = useRef();
    const slideZero = useRef();
    const slideOne = useRef();

    const ButtonCarusel = ({ next, previous, goToSlide, ...rest }) => {
        const { carouselState: { currentSlide } } = rest;
        return (
            <div style={{ display: 'none' }} className="carousel-button-group">
                <button ref={nextButton} onClick={() => next()} />
                <button ref={prevButton} onClick={() => previous()} />
                <button ref={slideZero} onClick={() => goToSlide(0)} />
                <button ref={slideOne} onClick={() => goToSlide(1)} />
            </div>
        );
    };

    debug('Context: ', user, true);

    const dbg = (e) => {
        // debug('This is the element: ', element, true);
        // debug('Second line!');
        debug(e);
    }

    let caruselSection = 
            Object.keys(aboutInfoDict.current).map((item, indx) => (
                <div  key={item + indx} className="flex center m2 mt3 mb3">
                    <Card
                        onClick={() => { setItem(p => item !== p ? item : undefined) }}
                        // className={`rtl pointer hoverGrad${indx % 6} ${item === selectItem ? 'constGrad' + indx : ''}`}
                        className={`rtl noneSelect pointer ${item === selectItem ? 'constGradTheme' : ''}`}
                        title={aboutInfoDict.current[item].title?.props?.children}
                        translateY={false}
                        cardID='aboutCard' >
                        {aboutInfoDict.current[item].img &&
                            <>
                                {aboutInfoDict.current[item].img}
                                <hr id='horizLine' />
                            </>
                        }
                        {aboutInfoDict.current[item].title}
                        {aboutInfoDict.current[item].promot}
                        <div
                            className="flex center pointer darkBlue opacityHover baseLine gap1">
                            <h5 >קראו עוד</h5>
                            <FontAwesomeIcon icon={faSortDown} />
                        </div>
                    </Card>
                </div>
            ))


    // let caruselSection2 = <>
    //     {
    //         Object.keys(aboutInfoDict.current).map((item, indx) => (
    //             (indx > 3 && indx < 8) && <Card
    //                 onClick={() => { setItem(p => item !== p ? item : undefined) }}
    //                 // className={`rtl pointer hoverGrad${indx % 6} ${item === selectItem ? 'constGrad' + indx : ''}`}
    //                 className={`rtl noneSelect pointer ${item === selectItem ? 'constGradTheme' : ''}`}
    //                 key={item + indx}
    //                 title={aboutInfoDict.current[item].title?.props?.children}
    //                 translateY={false}
    //                 cardID='aboutCard' >
    //                 {aboutInfoDict.current[item].img &&
    //                     <>
    //                         {aboutInfoDict.current[item].img}
    //                         <hr id='horizLine' />
    //                     </>
    //                 }
    //                 {aboutInfoDict.current[item].title}
    //                 {aboutInfoDict.current[item].promot}
    //                 <div
    //                     className="flex center pointer darkBlue opacityHover baseLine gap1">
    //                     <h5 >קראו עוד</h5>
    //                     <FontAwesomeIcon icon={faSortDown} />
    //                 </div>
    //             </Card>
    //         ))
    //     }

    // </>

    // let caruselSection3 = <>
    //     <Card
    //         className={` `}
    //         style={{ backgroundImage: 'linear-gradient( transparent, rgb(168 0 230 / 30%))' }}
    //         cardID={'frame2Card2'}>
    //         <>
    //             <div className='flex center ma3 darkBlue mt1 gap1'>
    //                 <FontAwesomeIcon
    //                     style={{ fontSize: '3em' }}
    //                     icon={fa0} className='' size='2xl' />
    //                 <FontAwesomeIcon
    //                     style={{ fontSize: '3em' }}
    //                     icon={fa0} className='' size='2xl' />
    //             </div>

    //             <div>
    //                 <h3 className='cardText'>יש עם מי לדבר</h3>
    //             </div>
    //             <hr id='horizLine' />
    //             <p >תוכלו לשאול שאלות ולהתייעץ עם המרצה ועם מורים אחרים, ניתן לפנות אלינו במגוון דרכים ולקבל מענה בהתאם לצורך</p>
    //             <div className='ma1 darkBlue gap1 flex around'>
    //                 <FontAwesomeIcon title='Whatsapp' icon={fa0} />
    //                 <FontAwesomeIcon title='טלפון' icon={fa0} />
    //                 <FontAwesomeIcon title='אימייל' icon={fa0} />
    //                 <FontAwesomeIcon title='שיתוף מסמכים' icon={fa0} />

    //             </div>
    //             <h3 id='textGradient'> ההצלחה שלכם חשובה לנו!</h3>
    //         </>
    //     </Card>
    //     <Card
    //         className={` `}
    //         style={{
    //             backgroundImage: 'linear-gradient(transparent, var(--themeColorAlpha))'
    //         }}
    //         cardID={'frame2Card2'}>
    //         <>
    //             <div className='flex center ma3 mt1 darkBlue gap1'>
    //                 <FontAwesomeIcon
    //                     style={{ fontSize: '3em' }}
    //                     icon={fa0} className='' size='2xl' />
    //                 <FontAwesomeIcon
    //                     style={{ fontSize: '2.5em' }}
    //                     icon={fa0} className='' size='2xl' />
    //             </div>

    //             <div>
    //                 <h3 className='cardText'>למידה דיגיטלית וחדשנית </h3>
    //             </div>
    //             <hr id='horizLine' />
    //             <p >תוכן ויזואלי ערוך תמציתי ומדויק, סרטונים ותרגילים ברמה גבוהה יחד עם ממשק דיגטלי וכלים שיעזרו לכם להבין כל נושא לעומק  </p>

    //             <h3 id='textGradient'> להבין מתמטיקה באופן אינטואיטיבי</h3>
    //         </>
    //     </Card>
    //     <Card
    //         className={` `}
    //         style={{ backgroundImage: 'linear-gradient(transparent, rgb(32 206 1 / 30%))' }}
    //         cardID={'frame2Card2'}>
    //         <>
    //             <div className='flex center ma3 mt1 darkBlue gap1'>
    //                 <FontAwesomeIcon
    //                     style={{ fontSize: '3em' }}
    //                     icon={fa0} className='' size='2xl' />
    //                 <FontAwesomeIcon
    //                     style={{ fontSize: '3em' }}
    //                     icon={fa0} className='' size='2xl' />
    //             </div>

    //             <div>
    //                 <h3 className='cardText'>ללמוד בכל זמן ומקום</h3>
    //             </div>
    //             <hr id='horizLine' />
    //             <p > בואו ללמוד בנוחות, בקצב וברמה שמתאימה לכם <br /> האתר מותאם לגלישה בקצב מהיר ונתמך ע"י רוב המכשירים</p>
    //             <div className='ma1 darkBlue gap1 flex around'>
    //                 <FontAwesomeIcon title='סמארטפון' icon={fa0} />
    //                 <FontAwesomeIcon title='מחשב נייד' icon={fa0} />
    //                 <FontAwesomeIcon title='מחשב נייח' icon={fa0} />
    //             </div>
    //             <h3 id='textGradient'> ללמוד מתי ואיפה שנוח לך</h3>
    //         </>
    //     </Card>
    // </>


    let aboutCarusel = <section className='caruselDiv'>
             <span style={{ zIndex: 39, right: '10%'}}
                    className="flex gap1 alignCenter w500 opacityHover pointer hoverTheme absolute"
                    onClick={()=>nextButton.current.click()} >
             <FontAwesomeIcon icon={faArrowCircleRight} size="2xl" />
                    הבא
            </span>
             <span style={{ zIndex: 39, left: '10%'}}
                    className="flex gap1 alignCenter w500 opacityHover pointer hoverTheme absolute"
                    onClick={()=>prevButton.current.click()} >
                    הקודם   
             <FontAwesomeIcon icon={faArrowCircleLeft} size="2xl" />
             </span>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={true}
                    customButtonGroup={<ButtonCarusel />}
                    responsive={responsive({mobile:2, tablet:3, desk:4})}
                    // ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    // autoPlaySpeed={1000}
                    keyBoardControl={true}
                    // customTransition="all .5"
                    // transitionDuration={1000}
                    // partialVisbile={true}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                        {caruselSection}
                    {/* <div className="flex wrap center" >
                        {caruselSection3}
                    </div> */}
                </Carousel>
        </section>

    let story = selectItem && <div className="border storyDiv center">
        <div className="flex tStart columns center" style={{ position: 'relative' }}>
            <FontAwesomeIcon
                className='opacityHover noneDisplay pointer'
                size="lg"
                title='סגירה'
                onClick={() => setItem(undefined)}
                style={{ position: 'absolute', top: '0.5em', left: '0.5em' }}
                icon={faCircleXmark} />
            <div className="darkBlue large">
                {aboutInfoDict.current[selectItem]?.title}
            </div>
            {aboutInfoDict.current[selectItem]?.body}
            <button  onClick={() => setItem(undefined)} className="themeConst noneDisplay">סגירה</button>
        </div>
    </div>

    return (
        <div id='about' className={`${user.darkMode ? 'darkMode' : ''}`}>
            <h2> הקורס הדיגיטלי המתקדם ביותר ללימודי מתמטיקה אונליין</h2>
            <h3 className="large">ללמוד, להבין ולתרגל מתמטיקה ממורים מנוסים שיודעים בדיוק מה אתם צריכים</h3>
            {aboutCarusel}
            {story}
        </div>
    )
}