const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const posts = [
    {
        title: 'Що таке Lorem Ipsum?',
        content: 'Lorem Ipsum - це текст-риба, що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба" не тільки успішно пережила п\'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп\'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.',
        updated_at: new Date()
    } , 
    {
        title: 'Звідки він походить?',
        content: 'На відміну від поширеної думки Lorem Ipsum не є випадковим набором літер. Він походить з уривку класичної латинської літератури 45 року до н.е., тобто має більш як 2000-річну історію. Річард Макклінток, професор латини з коледжу Хемпдін-Сидні, що у Вірджінії, вивчав одне з найменш зрозумілих латинських слів - consectetur - з уривку Lorem Ipsum, і у пошуку цього слова в класичній літературі знайшов безсумнівне джерело. Lorem Ipsum походить з розділів 1.10.32 та 1.10.33 цицеронівського "de Finibus Bonorum et Malorum" ("Про межі добра і зла"), написаного у 45 році до н.е. Цей трактат з теорії етики був дуже популярним в епоху Відродження. Перший рядок Lorem Ipsum, "Lorem ipsum dolor sit amet..." походить з одного з рядків розділу 1.10.32.',
        updated_at: new Date()
    }, 
    {
        title: 'Чому ми ним користуємось?',
        content: 'Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки. Сенс використання Lorem Ipsum полягає в тому, що цей текст має більш-менш нормальне розподілення літер на відміну від, наприклад, "Тут іде текст. Тут іде текст." Це робить текст схожим на оповідний. Багато програм верстування та веб-дизайну використовують Lorem Ipsum як зразок і пошук за терміном "lorem ipsum" відкриє багато веб-сайтів, які знаходяться ще в зародковому стані. Різні версії Lorem Ipsum з\'явились за минулі роки, деякі випадково, деякі було створено зумисно (зокрема, жартівливі).',
        updated_at: new Date()
    },
    {
        title: 'Lorem Ipsum',
        content: 'Lorem Ipsum - це текст-риба, що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною "рибою" аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. "Риба" не тільки успішно пережила п\'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп\'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum.',
        updated_at: new Date()
    },
    {
        title: 'Де собі взяти трохи?',
        content: 'Існує багато варіацій уривків з Lorem Ipsum, але більшість з них зазнала певних змін на кшталт жартівливих вставок або змішування слів, які навіть не виглядають правдоподібно. Якщо ви збираєтесь використовувати Lorem Ipsum, ви маєте упевнитись в тому, що всередині тексту не приховано нічого, що могло б викликати у читача конфуз. Більшість відомих генераторів Lorem Ipsum в Мережі генерують текст шляхом повторення наперед заданих послідовностей Lorem Ipsum. Принципова відмінність цього генератора робить його першим справжнім генератором Lorem Ipsum. Він використовує словник з більш як 200 слів латини та цілий набір моделей речень - це дозволяє генерувати Lorem Ipsum, який виглядає осмислено. Таким чином, згенерований Lorem Ipsum не міститиме повторів, жартів, нехарактерних для латини слів і т.ін.',
        updated_at: new Date()
    }
];

mongoClient.connect(url, function(err, client){

    if (err) throw err;
     
    const db = client.db("coolsite");
    const collection = db.collection("posts");
    
    collection.insertMany(posts, function(err, results){
             
        console.log(results);
        client.close();
    });
});
