import React, { useMemo } from 'react';
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import { createDesigner, GlobalRegistry, Shortcut, KeyCode } from '@designable/core';

import { LogoWidget, ActionsWidget, SchemaEditorWidget, MarkupSchemaWidget, PreviewWidget } from './widgets';
import { saveSchema } from '@/utils';
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Range,
  Rating,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '@/schema-components';

import 'antd/dist/antd.less';

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
});

const CompositePanelItem: any = CompositePanel.Item;

function Design() {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine);
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );
  return (
    <Designer engine={engine}>
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[
                Input,
                Password,
                NumberPicker,
                Rating,
                Range,
                Select,
                TreeSelect,
                Cascader,
                Transfer,
                Checkbox,
                Radio,
                DatePicker,
                TimePicker,
                Upload,
                Switch,
                ObjectContainer,
              ]}
            />
            <ResourceWidget
              title="sources.Layouts"
              sources={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
            />
            <ResourceWidget title="sources.Arrays" sources={[ArrayCards, ArrayTable]} />
            <ResourceWidget title="sources.Displays" sources={[Text]} />
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Range,
                      Rating,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => <SchemaEditorWidget tree={tree} onChange={onChange} />}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">{(tree) => <PreviewWidget tree={tree} />}</ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
}

export default Design;
