import { action } from '@storybook/addon-actions';
import React, { createElement, useState } from 'react';
import { AtlasmapUI } from '../src/AtlasmapUI';
import { ElementId, IMappings } from '../src/CanvasView';
import { mappings as sampleMappings, sources, targets } from './sampleData';

export default {
  title: 'Mapper',
};

export const sample = () =>
  createElement(() => {
    const [mappings, setMappings] = useState<IMappings[]>(sampleMappings);
    const addToMapping = (elementId: ElementId, mappingId: string) => {
      const updatedMappings = mappings.map(m => {
        if (m.id === mappingId) {
          if (/*elementType === */ 'source') {
            m.sourceFields = [
              ...m.sourceFields,
              { id: elementId, name: elementId, tip: elementId },
            ];
          } else {
            m.targetFields = [
              ...m.targetFields,
              { id: elementId, name: elementId, tip: elementId },
            ];
          }
        }
        return m;
      });
      setMappings(updatedMappings);
    };

    const createMapping = (sourceId: ElementId, targetId: ElementId) => {
      setMappings([
        ...mappings,
        {
          id: `${Date.now()}`,
          name: 'One to One (mock)',
          sourceFields: [{ id: sourceId, name: sourceId, tip: sourceId }],
          targetFields: [{ id: targetId, name: targetId, tip: targetId }],
        },
      ]);
    };

    return (
      <AtlasmapUI
        sources={sources}
        targets={targets}
        mappings={mappings}
        onImportAtlasFile={action('importAtlasFile')}
        onImportSourceDocument={action('onImportSourceDocument')}
        onImportTargetDocument={action('onImportTargetDocument')}
        onExportAtlasFile={action('exportAtlasFile')}
        onResetAtlasmap={action('resetAtlasmap')}
        onSourceSearch={action('onSourceSearch')}
        onTargetSearch={action('onTargetSearch')}
        onDeleteSourceDocument={action('onDeleteSourceDocument')}
        onDeleteTargetDocument={action('onDeleteTargetDocument')}
        onActiveMappingChange={action('onActiveMappingChange')}
        onShowMappingPreview={action('onShowMappingPreview')}
        onFieldPreviewChange={action('onFieldPreviewChange')}
        onAddToMapping={addToMapping}
        onCreateMapping={createMapping}
        pending={false}
        error={false}
      />
    );
  });
