import {AnimatePresence, motion} from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { DecalTypes, EditorTabs, FilterTabs } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { useState } from 'react';
import AiPicker from '../components/AIPicker';
import { reader } from '../config/helpers';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<FileList[0]>();
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState<'colorpicker' | 'filepicker' | 'aipicker' | string>('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  const generateTabContent = () => {
    switch(activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case 'aipicker':
        return <AiPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
      default:
        return null;
    }
  }
  const handleSubmit = async (type: "logo" | "full") => {
    if(!prompt) {
      return alert('Plz enter a prompt')
    }

    try {
      setGeneratingImg(true);
      const response = await fetch('http://localhost:3000/api/v1/dalle', {method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        prompt,
      })});

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch(error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  }

  const handleActiveFilterTab = (tabName: 'logoShirt' | 'stylishShirt') => {
    switch(tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
        default:
          state.isLogoTexture = true;
          state.isFullTexture = false;
          break;
    }

    setActiveFilterTab({
      logoShirt: state.isLogoTexture,
      stylishShirt: state.isFullTexture
    })
  }

  const handleDecals = (type: 'logo' | 'full', result: string) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty as 'logoDecal' | 'fullDecal'] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const readFile = (type: 'logo' | 'full') => {
    if(file) {
      reader(file).then((result) => {
        handleDecals(type, result as string);
        setActiveEditorTab('');
      })
    }
    
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab) => (
                    <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                  ))}
                  {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}> 
                <CustomButton type='filled' title="Go Back" handleClick={() => state.intro = true} customStyles='w-fit px-4 py-2.5 font-bold text-sm' />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
                  {FilterTabs.map((tab) => (
                    <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={() => handleActiveFilterTab(tab.name)} />
                  ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer