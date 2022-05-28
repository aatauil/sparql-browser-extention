import React, { useState, useRef, useContext } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from "@codemirror/theme-one-dark";
import { sparql } from '@codemirror/legacy-modes/mode/sparql';
import { StreamLanguage } from "@codemirror/language"
import { ViewContext } from '../context/ViewContext';
import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../db';
import TabList from './TabList';
import { TabContext } from '../context/TabContext';
import { tab } from '@testing-library/user-event/dist/tab';
import { useDebouncedCallback } from 'use-debounce';

var SparqlParser = require('sparqljs').Parser;

const lang = StreamLanguage.define(sparql);
var parser = new SparqlParser();

function Editor() {
  const view = useContext(ViewContext)
  const tabCtx = useContext(TabContext)
  const elem = useRef()

  async function query() {
    try {
      if(tabCtx.selected.code) {
        parser.parse(tabCtx.selected.code)
      }
    } catch(err)  {
      console.dir(err)
    }
  }

  const debounced = useDebouncedCallback(
    (value) => {
      console.log(value)
      db.tabs.update(tabCtx.selected , {
        code: value
      })
    },
    500
  );

  if(!tabCtx.selected) return null;

  return (
    <>
      <div className='h-full'>
        <CodeMirror
          value={tabCtx.selected.code}
          ref={elem}
          theme={oneDark}
          extensions={[lang]}
          editable={true}
          height="600px"
          onChange={(value, viewUpdate) => {
            debounced(value)
          }}
        />
        <button onClick={query} className="bg-gradient-to-r from-green-800 to-green-900 text-white px-6 py-2 text-lg w-full">excecute</button>
      </div>

    </>
  )
}

export default Editor