import React, { useState } from "react";
import {
  DeleteButton,
  EditButton,
  Form,
  Input,
  List,
  Modal,
  Radio,
  ShowButton,
  Space,
  Table,
  Tabs,
  Typography,
  useModalForm,
  useTable,
  useSelect,
  Select,
} from "@pankod/refine-antd";
import { LayoutWrapper, useShow } from "@pankod/refine-core";
 
// Components
 import { ContactsOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const UsersList = () => {
  const [form] = Form.useForm();

  const { tableProps: MakesTableProps, searchFormProps: MakesSearchFormProps } =
    useTable<any>({
      resource: "customers",
      metaData: {
        fields: [       
        "id",
        "name",
        "phone_no",
         "role",
        "created_at",
        "updated_at"],
      },
      onSearch: (value: any) => [
        {
          field: "title",
          operator: "contains",
          value: `%${value.q}%`,
        },
      ],
    });

  const { selectProps: makeSelects } = useSelect<any>({
    resource: "customers",
    optionValue: "id",
    optionLabel: "name",
    metaData: {
      fields: ["id", "name"],
    },
    fetchSize: 50,
  });

  // Create Vehicle Make Modal
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: "customers",
    action: "create",
    redirect: false,
  });

  // Edit Vehicle Make Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<any>({
    resource: "customers",
    action: "edit",
    metaData: {
      fields: [
         
        "name",
        "phone_no",
         "role",
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

  console.log("editFormProps",editFormProps)

  // Show Vehicle Make Modal
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { queryResult, setShowId } = useShow<any>({
    resource: "customers",
    metaData: {
      fields: [            
        "id",
      "name",
      "phone_no",
       "role",],
    },
  });

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      <Form form={form} layout="inline" {...MakesSearchFormProps}>
        <Form.Item name="q">
          <Input
            style={{ minWidth: "400px", margin: "20px 0" }}
            placeholder="Search NIC/BRN, Quotation Number, Vehicle No"
          />
        </Form.Item>
      </Form>
      <List
        title={"Manage Vehicle Makes"}
        createButtonProps={{
          style: {
            backgroundColor: "#2a3042",
            border: "unset",
            outline: "unset",
            color: "#fff",
          },
          onClick: () => {
            createModalShow();
          },
        }}
      >
        <Table className="custom-table" {...MakesTableProps} rowKey="id">
        <Table.Column dataIndex={"id"} title="Id" />
            <Table.Column dataIndex={"name"} title="Name" />
            <Table.Column dataIndex={"phone_no"} title="Phone No" />
            <Table.Column dataIndex={"role"} title="Role" />
            <Table.Column dataIndex={"created_at"} title="Created At" />
            <Table.Column dataIndex={"updated_at"} title="Updated At" />

          <Table.Column<any>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record: any) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editModalShow(record.id)}
                />
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    setVisibleShowModal(true);
                  }}
                />
                <DeleteButton
                  resourceName="customers"
                  size="small"
                  recordItemId={record.id}
                  hideText
                />
              </Space>
            )}
          />
        </Table>
      </List>
      {/* ********* Makes Modals ***********/}

      <Modal {...createModalProps}>
      <Form
          {...createFormProps}
          layout='vertical'
          initialValues={{
            active: true,
          }}
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone No'
            name='phone_no'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Role '
            name='role'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal {...editModalProps}>
      <Form
          {...editFormProps}
          layout='vertical'
          // initialValues={{
          //   active: true,
          // }}
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Phone No'
            name='phone_no'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Role '
            name='role'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={visibleShowModal}
        onCancel={() => setVisibleShowModal(false)}
        title="Show post"
      >
        <Title level={5}>Id</Title>
        <Text>{record?.id}</Text>

        <Title level={5}>Title</Title>
        <Text>{record?.title}</Text>

        <Title level={5}>Active</Title>
        <Text>{`${record?.active}`}</Text>
      </Modal>
    </>
  );
};
