import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import React, { createElement, FunctionComponent, useState } from 'react';
import { CanvasProvider } from '../../../src/Canvas';
import {
  CanvasView,
  CanvasViewCanvasProvider,
  FieldsBox,
} from '../../../src/CanvasView';
import { MappingElement } from '../../../src/CanvasView/components';
import { mappings } from '../../sampleData';

export default {
  title: 'CanvasView/MappingElement',
};

const Wrapper: FunctionComponent = ({ children }) => (
  <CanvasProvider
    width={310}
    height={410}
    zoom={1}
    offsetTop={0}
    offsetLeft={0}
    panX={0}
    panY={0}
  >
    <CanvasViewCanvasProvider>
      <CanvasView>
        <FieldsBox
          id={'sample'}
          initialWidth={300}
          initialHeight={400}
          position={{ x: 10, y: 10 }}
          header={'Mappings'}
          visible={false}
        >
          {children}
        </FieldsBox>
      </CanvasView>
    </CanvasViewCanvasProvider>
  </CanvasProvider>
);

export const interactive = () => {
  return createElement(() => {
    const [selectedMapping, setSelectedMapping] = useState<
      string | undefined
    >();
    const handleSelectMapping = (id: string) => {
      setSelectedMapping(id);
    };
    const handleDeselectMapping = () => {
      setSelectedMapping(undefined);
    };
    return (
      <Wrapper>
        <MappingElement
          boxRef={null}
          node={mappings[0]}
          selectedMapping={selectedMapping}
          selectMapping={handleSelectMapping}
          deselectMapping={handleDeselectMapping}
          editMapping={action('editMapping')}
          canDrop={boolean('Can drop', false)}
          isOver={boolean('Is over', false)}
        />
      </Wrapper>
    );
  });
};

export const canDrop = () => (
  <Wrapper>
    <MappingElement
      boxRef={null}
      node={mappings[0]}
      selectedMapping={undefined}
      selectMapping={() => void 0}
      deselectMapping={() => void 0}
      editMapping={() => void 0}
      isOver={false}
      canDrop={true}
    />
  </Wrapper>
);

export const isHoverCanDrop = () => (
  <Wrapper>
    <MappingElement
      boxRef={null}
      node={mappings[0]}
      selectedMapping={undefined}
      selectMapping={() => void 0}
      deselectMapping={() => void 0}
      editMapping={() => void 0}
      isOver={true}
      canDrop={true}
    />
  </Wrapper>
);
