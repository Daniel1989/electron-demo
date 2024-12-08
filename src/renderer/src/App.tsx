import { MenuOutlined, WarningOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef, useState } from 'react';

const data = [
  {
    key: 'key1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 'key2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 'key3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 'key31',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 'key32',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: 'key33',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const wait = async (delay = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(void 0), delay));

let remoteData = data.map((item) => ({
  ...item,
  name: `[remote data] ${item.name}`,
}));
const request = async () => {
  await wait(3000);
  return {
    data: remoteData,
    total: remoteData.length,
    success: true,
  };
};

export default () => {
  const columns: ProColumns[] = [
    
    {
      title: '姓名',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      render: (dom, rowData, index) => {
        return (
          <span className="customRender">{`自定义Render[${rowData.name}-${index}]`}</span>
        );
      },
    },
  ];
  const columns2: ProColumns[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      className: 'drag-visible',
      onCell: (row, index) => {
        if (index === 0) {
          return {
            rowSpan: 3,
          };
        }
        if (index === 1 || index === 2) {
          return {
            rowSpan: 0,
          };
        }
        return {
          rowSpan: 1,
        };
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '地址1',
      render: (_, record) => {
        return (
          <WarningOutlined style={{ color: 'red' }} />
        );
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
  ];
  const actionRef = useRef<ActionType>();
  const [dataSource1, setDatasource1] = useState(data);
  const [dataSource2, setDatasource2] = useState(data);
  const handleDragSortEnd1 = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource);
    setDatasource1(newDataSource);
    message.success('修改列表排序成功');
  };
  const handleDragSortEnd2 = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource);
    setDatasource2(newDataSource);
    message.success('修改列表排序成功');
  };
  const handleDragSortEnd3 = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource);
    // 模拟将排序后数据发送到服务器的场景
    remoteData = newDataSource;
    // 请求成功之后刷新列表
    actionRef.current?.reload();
    message.success('修改列表排序成功');
  };

  const dragHandleRender = (rowData: any, idx: any) => (
    <>
      <MenuOutlined style={{ cursor: 'grab', color: 'gold' }} />
    </>
  );

  return (
    <>
      <DragSortTable
      // showHeader={false}
        headerTitle="拖拽排序(自定义把手)"
        columns={columns2}
        rowKey="key"
        search={false}
        pagination={false}
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
      />

<DragSortTable
      // showHeader={false}
        headerTitle="拖拽排序(自定义把手)"
        columns={columns2}
        rowKey="key"
        search={false}
        pagination={false}
        dataSource={dataSource2}
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
        onDragSortEnd={handleDragSortEnd2}
      />
      
    </>
  );
};