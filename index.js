import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://psiyfvjgjhfzshbodekm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaXlmdmpnamhmenNoYm9kZWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTkxMjEsImV4cCI6MjA2MTY3NTEyMX0.XN4-eWid9vLgS4gG7K0LGmd-8v6QAPGmWqeVRPbYJ2U';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/wherestate', async (req, res) => {
  const gcn = req.query.gcn;
  const { data: datas } = await supabase
    .from('hoorm_students')
    .select('*')
    .eq('gcn', gcn);
  if (datas.length === 0) {
    res.send('none');
  } else {
    res.send(datas[0].where);
  }
});

app.get('/changewhere', async (req, res) => {
  const gcn = req.query.gcn;
  const check = req.query.check;
  await supabase
    .from('hoorm_students')
    .update({ where: check === 'true' ? 'dorm' : 'school' })
    .eq('gcn', gcn);
  res.send('did');
});

app.get('/checkstate', async (req, res) => {
  const gcn = req.query.gcn;
  const { data: datas } = await supabase
    .from('hoorm_students')
    .select('*')
    .eq('gcn', gcn);
  if (datas.length === 0) {
    res.send('none');
  } else {
    res.send(datas[0].check);
  }
});

app.get('/changecheck', async (req, res) => {
  const gcn = req.query.gcn;
  const check = req.query.check;
  await supabase.from('hoorm_students').update({ check }).eq('gcn', gcn);
  res.send('did');
});

app.get('/dormpeople', async (req, res) => {
  const { data: datas } = await supabase
    .from('hoorm_students')
    .select('*')
    .eq('where', 'dorm');
  res.send(datas);
});

app.get('/schoolpeople', async (req, res) => {
  const { data: datas } = await supabase
    .from('hoorm_students')
    .select('*')
    .eq('where', 'school');

  console.log(datas);
  res.send(datas);
});

app.get('/dorm', (req, res) => {
  res.sendFile(__dirname + '/dorm.html');
});

app.get('/check', (req, res) => {
  res.sendFile(__dirname + '/check.html');
});

app.listen(port);

async function insert() {
  const things = [];
  for (let thing of things) {
    await supabase.from('hoorm_students').insert(thing);
  }
}
