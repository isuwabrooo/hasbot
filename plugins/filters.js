/* Copyright (C) 2020 Mikhaiel.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const jid = Config.DISBGM != false ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919544846609@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['1 vs 1 vada','1','2','@','Aa','Aara','Aara','Aarulle','Achan','Adi','Aliya Da','Aliya','Aliyo','Alok','Alone','Anthas','Anu kiran','Anu','Ar','Ara','Area','Ariyilla','Arulle','Ayin','Ayn','Aysheri','Ayyo','Azaru','BGM','Baby','Bad','Bairavaa','Bass bgm','Bgm id','Bgm','Bhasi','Big','Booyah','Boss','Bot','Bot uyir','Bro','Broken','Bye','Call','Cash','Chadhi','Chatho','Chathy','Chaya kudicho','Chaya','Chetta','Chiri','Chirikano','Chunk uyr','Chunk','Contact Admin','Corona','Cr7','Cr7 back','Cr7','Cry','Csk','Da seen','Da','Dai','Di','Die','Dj','Don','Dora','Eda Kalla','Eda','Edi','Eee','Eid','Ellarum ede','En nenjil','Endi','Engane und','Enik arum illa','Ente jeevan','Enth patti','Entha cheyya','Entha','Enthada','Enthupatti','Entry bgm','Eppo orthe','Error','Evane konnalo','Evide','Exam potti','Fan','Feel aayi','Feel','Fek','Food','Fresh','Friend','Frnd','Fuck','Fun','Game','Gd mng','Gd mrng','Gd ngt','Gd night','Goal','Good bye','Group members','Gud nyt','Ha','Hambada','Happy Birthday','Hate','Haters','Hbd','Hbday','Hehe','Helo','Help','Hi all','Hi','Hlo','Hloo','Hm','Hoi','Hy','Ikkachi','Insult','Jd','Jimbroota','Jimbrootan','Jinn','Jocker','Julie','Kadhal','Kadhali','Kakka','Kali','Kalikkando','Kanapi','Kanaran','Kanja','Kanjan','Kanjav','Kariyam','Kazhicho','Kaztro','Kemam','Kevin','Kgf','Kill','Killadi','Killedi','King','Kollam','Kooi','Kozhi','Kozhu','Kundan','Kunju','Kunna','Kurup','Kutty','La be','Lala','Legend','Leopucha','Life','Line undo','Lo','Loo','Look','Love tune','Love u','Love','Lover','Loveu','Lub u','M','Mad','Malang','Mass','Master','Mathy','Mention','Mention','Messi','Mikhaiel','Mindathe erik','Mohanlal','Mood','Moodesh','Morning','Mrng','Music pranthan','Music','Muth','Muthe','Mwol','My god','My love','Myr','Myre','Nalla kutty','Nalladha','Nallakutti','Nallath','Name','Nanayikoode','Nanban','Nanbanda','Nanbiye','Nannayi kude','Nanni','Nee Vaa','Nee poda','New','Neymar','Neymer','Nirthada','Nirtheda','Nishal','Njagal enth venam','Njan powa','Njan','Njn vera','Njn','Njr','No','Noob','Oh','Oh no','Oh','Ohk','Ok bei','Ok bye','Ok da','Ok','Okay','Omb','Oo','Ooi','Oompi','Ottak','Over','Owner','Paad','Paat','Paatt','Paavam','Padicho','Paisa','Pala shaji','Pani','Panni','Patt','Patti','Pennu','Perfect Ok','Perfect ok','Pever','Pewer','Pinky','Pinkymol','Pinnallah','Poda ule','Poda','Podai','Podi','Poli','Pooda','Poompatta gunda','Poote','Pora','Portugal','Potta','Potte','Povano','Powa','Power','Power veratte','Power','Poweresh','Poyeda','Poyi chavada','Poyo','Pranayam','Psycho','Pwoli','Ramos','Rasheed','Rashmika','Re entry','Remove','Rose','Sad','Sahva','Saji','Sana','Sayip','Scene','Sed aayi','Sed tune','Sed','Selfi penagi','Senior','Serious','Set','Set aano','Set aano','Set alle','Seth po','Silent','Singapenne','Single','Single','Sis','Smile','Sneham','Sneham mathram','Soldier','Song','Sry','Story','Subscribe','Suhail','Super','Support','T Kudicho','T','Tentacion','Thalapathy','Thallam','Thamasha','Thamasha kalikkathe','Thampuran','Thantha','Theapp','Theri','Thot','Thug','Thugi Chavan','Thukkaam','Town','Track maat','Tuttu','Tuttu','Uff','Umbi','Umma','Uyir','Va','Vaa','Vada','Vannu','Vava','Vazha','Veeran','Venda','Vidhi','Wait','Waiting','Welcome','Why','Yaar','Z aayi','aara','adi','adich','admin','alive','ano','ariyam','ariyo','arum ille evide','arum ille','avastha','ayilla','ayin','ayn','aysheri','ayye','baa','baby','bad boy','bahubali','bgm','bie','big fan','birthday','biscket','brokenbrokenlove','care','chadhi','charlie','chatho','chill','chunke','chunks','colony','comedy','devadha','don','dora','doubt','durantham','ee','ekk','endi','engane und','enikk deshyam verunnu','enne arkum venda','ennitt','ente Piller','enth patti','enth','entha','evde','evide','exam','fail aayi','fd','ff','frd','free','fresh','gd n8','gd n8','gdmng','gdngt','ghost','gift','git','good bye','good night','group','grp','ha','hacker','hambada','hate','hbday','help','hi','https','i am back','i like you','ijathi','iravum enn pakalum','istam aannu','ithokke engane','jimbrootan ara','kali','kar98','kerivaa','kiii','kiss','kitti','kk','kozhi','kukku','kunda','kunna','kuthirappavan','left','line','love u','love you','lover','lub','lucifer','machan','malayalam','manasilayo','manath','mass bgm','mass','matam','mathi','may i','mention','mier','mindalle','mindathe erik','mindathe','mine','mm','mood sheri alla','moonji','mrng','music','my area','mybos','mylove','myr','nallath','nallatha','name entha','nanayikoode','nanayikude','nanban','nee kollamello','nee onnu poye','nee vendum vannoo','nee','neon','neymar','nirthada','njan','njn anu','njn','noob','offer','oh','oho','ok bei','ok da','onn podo','ool','oomb','oombi','oompi','oorma','ottak aakki','owner','paamb','paatt','padakam','padicho','pain','pani paali','pani','para','parayatte','patti','pavam','per','perfect ok','pever','pha','photo','pic','pilleru','place','pm','poda myr','poda','poli','polika','ponu','poora','post','pova','power','poyi','private','psycho','public','rare','rascal','rasool','recharge','return','riyammooo','saji','samshayam','save','scene','sed bgm','sed','set aano','shutdown','silent','single','sketched','sneham','songs','sorry','sry','sthalam','sugham','sulthan','tagall','tea kudicho','thaa','thada','Thall','thantha','tharuo','thayirmulak','thayoli','thech','thee','theri','thett','tholvi','thot','thottu','thug','thyr','trance','tts','umfi','umma','urang','uyir','vaa','vannu','vedi','venda','vendum vanno','verithanam','vimanam','viran','voice','wow']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync(`./uploads/${a.toLowerCase()}.mp3`), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919544846609@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['1 vs 1 vada','1','2','@','Aa','Aara','Aara','Aarulle','Achan','Adi','Adi','Adi','Aliya Da','Aliya','Aliyo','Alok','Alone','Anthas','Anu kiran','Anu','Ar','Ara','Area','Ariyilla','Arulle','Ayin','Ayn','Aysheri','Ayyo','Azaru','BGM','Baby','Bad','Bairavaa','Bass bgm','Bgm id','Bgm','Bhasi','Big','Booyah','Boss','Bot','Bot uyir','Bro','Broken','Bye','Call','Cash','Chadhi','Chatho','Chathy','Chaya kudicho','Chaya','Chetta','Chiri','Chirikano','Chunk uyr','Chunk','Contact Admin','Corona','Cr7','Cr7 back','Cr7','Cry','Csk','Da seen','Da','Dai','Di','Die','Dj','Don','Dora','Eda Kalla','Eda','Edi','Eee','Eid','Ellarum ede','En nenjil','Endi','Engane und','Enik arum illa','Ente jeevan','Enth patti','Entha cheyya','Entha','Enthada','Enthupatti','Entry bgm','Eppo orthe','Error','Evane konnalo','Evide','Exam potti','Fan','Feel aayi','Feel','Fek','Food','Fresh','Friend','Frnd','Fuck','Fun','Game','Gd mng','Gd mrng','Gd ngt','Gd night','Goal','Good bye','Group members','Gud nyt','Ha','Hambada','Happy Birthday','Hate','Haters','Hbd','Hbday','Hehe','Helo','Help','Hi all','Hi','Hlo','Hloo','Hm','Hoi','Hy','Ikkachi','Insult','Jd','Jimbroota','Jimbrootan','Jinn','Jocker','Julie','Kadhal','Kadhali','Kakka','Kali','Kalikkando','Kanapi','Kanaran','Kanja','Kanjan','Kanjav','Kariyam','Kazhicho','Kaztro','Kemam','Kevin','Kgf','Kill','Killadi','Killedi','King','Kollam','Kooi','Kozhi','Kozhu','Kundan','Kunju','Kunna','Kurup','Kutty','La be','Lala','Legend','Leopucha','Life','Line undo','Lo','Loo','Look','Love tune','Love u','Love','Lover','Loveu','Lub u','M','Mad','Malang','Mass','Master','Mathy','Mention','Mention','Messi','Mikhaiel','Mindathe erik','Mohanlal','Mood','Moodesh','Morning','Mrng','Music pranthan','Music','Muth','Muthe','Mwol','My god','My love','Myr','Myre','Nalla kutty','Nalladha','Nallakutti','Nallath','Name','Nanayikoode','Nanban','Nanbanda','Nanbiye','Nannayi kude','Nanni','Nee Vaa','Nee poda','New','Neymar','Neymer','Nirthada','Nirtheda','Nishal','Njagal enth venam','Njan powa','Njan','Njn vera','Njn','Njr','No','Noob','Oh','Oh no','Oh','Ohk','Ok bei','Ok bye','Ok da','Ok','Okay','Omb','Oo','Ooi','Oompi','Ottak','Over','Owner','Paad','Paat','Paatt','Paavam','Padicho','Paisa','Pala shaji','Pani','Panni','Patt','Patti','Pennu','Perfect Ok','Perfect ok','Pever','Pewer','Pinky','Pinkymol','Pinnallah','Poda ule','Poda','Podai','Podi','Poli','Pooda','Poompatta gunda','Poote','Pora','Portugal','Potta','Potte','Povano','Powa','Power','Power veratte','Power','Poweresh','Poyeda','Poyi chavada','Poyo','Pranayam','Psycho','Pwoli','Ramos','Rasheed','Rashmika','Re entry','Remove','Rose','Sad','Sahva','Saji','Sana','Sayip','Scene','Sed aayi','Sed tune','Sed','Selfi penagi','Senior','Serious','Set','Set aano','Set aano','Set alle','Seth po','Silent','Singapenne','Single','Single','Sis','Smile','Sneham','Sneham mathram','Soldier','Song','Sry','Story','Subscribe','Suhail','Super','Support','T Kudicho','T','Tentacion','Thalapathy','Thall','Thallam','Thamasha','Thamasha kalikkathe','Thampuran','Thantha','Theapp','Theri','Thot','Thug','Thugi Chavan','Thukkaam','Town','Track maat','Tuttu','Tuttu','Uff','Umbi','Umma','Uyir','Va','Vaa','Vada','Vannu','Vava','Vazha','Veeran','Venda','Vidhi','Wait','Waiting','Welcome','Why','Yaar','Z aayi','aara','adi','adich','admin','alive','ano','ariyam','ariyo','arum ille evide','arum ille','avastha','ayilla','ayin','ayn','aysheri','ayye','baa','baby','bad boy','bahubali','bgm','bie','big fan','birthday','biscket','brokenbrokenlove','care','chadhi','charlie','chatho','chill','chunke','chunks','colony','comedy','devadha','don','dora','doubt','durantham','ee','ekk','endi','engane und','enikk deshyam verunnu','enne arkum venda','ennitt','ente Piller','enth patti','enth','entha','evde','evide','exam','fail aayi','fd','ff','frd','free','fresh','gd n8','gd n8','gdmng','gdngt','ghost','gift','git','good bye','good night','group','grp','ha','hacker','hambada','hate','hbday','help','hi','https','i am back','i like you','ijathi','iravum enn pakalum','istam aannu','ithokke engane','jimbrootan ara','kali','kar98','kerivaa','kiii','kiss','kitti','kk','kozhi','kukku','kunda','kunna','kuthirappavan','left','line','love u','love you','lover','lub','lucifer','machan','malayalam','manasilayo','manath','mass bgm','mass','matam','mathi','may i','mention','mier','mindalle','mindathe erik','mindathe','mine','mm','mood sheri alla','moonji','mrng','music','my area','mybos','mylove','myr','nallath','nallatha','name entha','nanayikoode','nanayikude','nanban','nee kollamello','nee onnu poye','nee vendum vannoo','nee','neon','neymar','nirthada','njan','njn anu','njn','noob','offer','oh','oho','ok bei','ok da','onn podo','ool','oomb','oombi','oompi','oorma','ottak aakki','owner','paamb','paatt','padakam','padicho','pain','pani paali','pani','para','parayatte','patti','pavam','per','perfect ok','pever','pha','photo','pic','pilleru','place','pm','poda myr','poda','poli','polika','ponu','poora','post','pova','power','poyi','private','psycho','public','rare','rascal','rasool','recharge','return','riyammooo','saji','samshayam','save','scene','sed bgm','sed','set aano','shutdown','silent','single','sketched','sneham','songs','sorry','sry','sthalam','sugham','sulthan','tagall','tea kudicho','thaa','thada','thantha','tharuo','thayirmulak','thayoli','thech','thee','theri','thett','tholvi','thot','thottu','thug','thyr','trance','tts','umfi','umma','urang','uyir','vaa','vannu','vedi','venda','vendum vanno','verithanam','vimanam','viran','voice','wow']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync(`./uploads/${a.toLowerCase()}.mp3`), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.AUTOSTICKER){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '919544846609@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./stickers/mention.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['Error','Jimbrootan','Hi','Bye','Muthe','Police','Teach','Thech','Z','aayo','alla','anthas','ayin','aysheri','bie','bye','chathu','cheyalle','chunk','committed','mama','marichu','mention','mood','muthe','myre','njan','number','ok','oombi','ooo','pedicho','pidi','poweresh','sad','saved','sed','shaad','shut','teach','test','thech','think','thund','umma','uyir','vannu','vibe','z','dead','JulieMwol','Like','pever','sry','night','indo','uff','eh','poyi','scene','killadi','nee alle','sheri','vada','poocha','morning','pm','thund','remove','Sed','araa','Da','madthu','Hlo','air','Bomb','Julie','myr','fan','charge',]
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./stickers/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        if (pattern.test(message.message)) {
            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
        }
    }
);
}));
}
