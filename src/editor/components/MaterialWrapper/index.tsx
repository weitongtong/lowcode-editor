import { Segmented } from 'antd';
import { useState } from 'react';
import { Material } from "../Material";
import { Outline } from "../Outline";
import { Source } from "../Source";

export function MaterialWrapper() {

    const [key, setKey] = useState('物料');
    return (
        <div>
            <Segmented
                value={key}
                onChange={setKey}
                options={['物料','大纲','源码']}
                style={{width: '100%'}}
            />
            <div className='pt-[20px] h-[calc(100vh-60px-30px-20px)]'>
                {
                    key === '物料' && <Material/>
                }
                {
                    key === '大纲' && <Outline/>
                }
                {
                    key === '源码' && <Source/>
                }
            </div>
        </div>
    );
}
