import { useSnapshot } from 'valtio';
import { EditorTabs } from '../config/constants'
import state from '../store';

interface Props {
    tab: typeof EditorTabs[0];
    handleClick: () => void;
    isFilterTab?: boolean;
    isActiveTab?: boolean;
}

const Tab = ({tab, isActiveTab, isFilterTab, handleClick}: Props) => {
  const snap = useSnapshot(state);

  const activeStyles = isActiveTab && isFilterTab ? {backgroundColor: snap.color, opacity: 0.5} : {backgroundColor: 'transparent', opacity: 1}

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorhism' : 'rounder-4'}`}
      onClick={handleClick}
      style={activeStyles}
    ><img src={tab.icon} alt={tab.name} className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`} /></div>
  )
}

export default Tab