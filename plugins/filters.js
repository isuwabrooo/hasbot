/* Copyright (C) 2020 Mikhaiel.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');

const Language = require('../language');
const Lang = Language.getString('filters');

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
        if (!!message.mention && message.mention[0] == '919544846609@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['Hi','aara','Aarulle','Adi','alive','Alok','Alone','Anu kiran','Anu','arum ille','New','avastha','ayilla,'Ayn','ayn','aysheri','baby ','baby','Bad','bgm','big fan','Boss','Ayin','Bot','Broken','Chadhi','Chatho','Chaya kudicho','Chiri','Chunk ','Chunk','Contact Admin','Cr7 back','Cr7','Die','durantham','Endi','engane und','enikk deshyam verunnu','ennitt','Ente jeevan','ente Piller','Enth patti','entha','Evide','fail aayi','Feel aayi','Feel','Fek','Food','Fresh','Friend','Gd mrng','Gd ni8','gd nyt','ghost','good bye','Good bye','Good morning','good night','Group chatho','Group members','gud ni8','Hate','Haters','Happy Birthday','Hate','Haters','Hehe','Helo','Hi all','Hlo','Hm','i like you','Insult','istam aannu','Jimbroota','Jinn','Kali','kar98','Kgf','Killadi','King','Kooi','Kozhi','Kunna','Kurup','La be','Lala','Legend','Life','Love u','love you','Love','Lover','Malang','manasilayo','mass','mention','Messi','Mikhaiel','Mindathe erik ','mindathe erik','mine','mood sheri alla','Moodesh','Music','myr','Myr','Myre','Nallath','name entha','Name','Nanayikoode','nanban','nee kollamello','nee onnu poye','Nee poda','nee vendum vannoo','New','neymar','nirthada','Njan powa','noob','Oh','Ohk','Ok bei','Ok da','Okay','Oompi','ottak aaki','ottak aakki ','ottak aakki','Owner','Paad','Paad','paamb','Paatt','Padicho','pain','pani paali','Pani','parayatte','Patti','Nepavam','Perfect ok','pha','Poda ','poda myr','Poda ule','poda','Poda','poora','Portugal','Powa','Power veratte','Power','power','Poweresh','Poyi chavada','psycho','Psycho','Pwoli','Ramos','riyammooo','Scene','Sed aayi','sed bgm','Sed','Set aano','Set alle','Silent','Single','sketched','Smile','Sneham mathram','Sneham','sorry','sry','Story','Subscribe','T Kudicho','tea kudicho','Tentacion','Thall','Thamasha kalikkathe','Thamasha','Thantha','Theri','Thot','thug','Thukkaam','trance','Tuttu','Uff','umma','uyir','uyir','Vazha','Venda','vendum vanno','viran','waiting','Welcome','Why']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});

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

