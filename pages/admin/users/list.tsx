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

export const AdminUsersList = () => {
  const [form] = Form.useForm();

  const { tableProps: MakesTableProps, searchFormProps: MakesSearchFormProps } =
    useTable<any>({
      resource: "users_view",
      metaData: {
        fields: [
          "id",
          "display_name",
          "created_at",
          "default_role",
          "email",
          "email_verified",
          "last_seen",
          "phone_number",
          "phone_number_verified",
        ],
      },

      onSearch: (value: any) => [
        {
          field: "display_name",
          operator: "contains",
          value: `%${value.q}%`,
        },
      ],
    });

  const { selectProps: rolesSelectProps } = useSelect<any>({
    resource: "authRoles",
    optionValue: "role",
    optionLabel: "role",
    metaData: {
      fields: ["role"],
    },
    fetchSize: 50,
  });

  // Create Vehicle Make Modal
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: "users",
    action: "create",
    redirect: false,
  });

  // Edit Vehicle Make Modal
  const [showModal, setShowModal] = useState(false);
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<any>({
    resource: "users",
    action: "edit",
    metaData: {
      fields: [
        "displayName",
        "createdAt",
        "defaultRole",
        "email",
        "emailVerified",
        "lastSeen",
        "phoneNumber",
        "phoneNumberVerified",
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

  console.log("editFormProps", editFormProps);

  // Show Vehicle Make Modal
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { queryResult, setShowId } = useShow<any>({
    resource: "customers",
    metaData: {
      fields: ["id", "name", "phone_no", "role"],
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
            placeholder="Search by name"
          />
        </Form.Item>
      </Form>
      <List
        title={"Users"}
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
          <Table.Column dataIndex={"display_name"} title="Name" />
          <Table.Column dataIndex={"phone_number"} title="Phone No" />
          <Table.Column
            dataIndex={"phone_number_verified"}
            title="phoneNumber Verified"
            render={(val) => (val ? "true" : "false")}
          />

          <Table.Column dataIndex={"email"} title="Email" />
          <Table.Column
            dataIndex={"email_verified"}
            title="Email Verified"
            render={(val) => (val ? "true" : "false")}
          />
          <Table.Column dataIndex={"last_seen"} title="Last Seen" />
          <Table.Column dataIndex={"default_role"} title="Role" />
          <Table.Column dataIndex={"created_at"} title="Created At" />
          <Table.Column dataIndex={"default_role"} title="Role" />

          <Table.Column<any>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record: any) => (
              <Space>
                {/* <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => setShowModal(true)}
                  // onClick={() => editModalShow(record.id)}
                /> */}
                {/* <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    setVisibleShowModal(true);
                  }}
                /> */}
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
          layout="vertical"
          initialValues={{
            active: true,
          }}
        >
          <Form.Item
            label="Name"
            name="displayName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phoneNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Locale"
            name="locale"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label='Role '
            name='role'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item label="Role" name="defaultRole">
            <Select {...rolesSelectProps} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal visible={true} {...editModalProps}>
        <Form
          {...createFormProps}
          layout="vertical"
          initialValues={{
            active: true,
          }}
        >
          <Form.Item
            label="Name"
            name="displayName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone No"
            name="phoneNumber"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Locale"
            name="locale"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label='Role '
            name='role'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item label="Role" name="defaultRole">
            <Select {...rolesSelectProps} />
          </Form.Item>
        </Form>
      </Modal>

      {/* <Modal
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
      </Modal> */}
    </>
  );
};
