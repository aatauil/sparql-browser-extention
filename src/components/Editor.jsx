import React, { useRef} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from "@codemirror/theme-one-dark";
import { sparql } from '@codemirror/legacy-modes/mode/sparql';
import { StreamLanguage } from "@codemirror/language"
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../db';
import { useDebouncedCallback } from 'use-debounce';
import { CopyToClipboard } from 'react-copy-to-clipboard';

var SparqlParser = require('sparqljs').Parser;

const lang = StreamLanguage.define(sparql);
var parser = new SparqlParser();

function Editor() {
  const elem = useRef()

  const file = useLiveQuery(() => db.files.where({ focused: 1 }).first());

  const debounced = useDebouncedCallback(
    (value) => {
      db.files.update(file.id , {
        code: value
      })
    },
    500
  );

  async function query() {
    try {
      if(file.code) {
        parser.parse(file.code)
      }

    const res = await fetch('https://dbpedia.org/sparql', {
        method: 'POST',
        body: file.code,
        headers: {
          'Accept': 'application/sparql-results+json,*/*;q=0.9',
          'Content-Type': 'application/sparql-query'
        }
      })

      const output = await res.json();

      db.files.update(file, {
        output: output.results.bindings
      })
    } catch(err)  {
      console.dir(err)
    }
  }


  if(!file) return null;

  return (
    <>
      <div className='relative h-full'>
        <CodeMirror
          value={file.code}
          ref={elem}
          theme={oneDark}
          extensions={[lang]}
          editable={true}
          height="600px"
          onChange={(value, viewUpdate) => {
            debounced(value)
          }}
        />
        <div className='absolute top-0 right-0 flex items-center space-x-2 mr-6 mt-4'>
          <button onClick={query} className='text-green-500 bg-zinc-900/30 rounded h-12 w-12 flex items-center justify-center border border-green-700'>
            <i className="ri-play-mini-line text-3xl leading-none"></i>
          </button>
          <CopyToClipboard text={file.code}>
            <button className='text-zinc-400 bg-zinc-900/30 rounded h-12 w-12 flex items-center justify-center border border-zinc-600'>
              <i className="ri-clipboard-line text-xl leading-none"></i>
            </button>
          </CopyToClipboard>
        </div>
      </div>

    </>
  )
}

export default Editor