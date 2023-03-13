import {
  Table,
  useTable,
  Form,
  Input,
  List,
  EditButton,
  ShowButton,
  useModalForm,
  Typography,
  Modal,
  useSelect,
  Select,
  DeleteButton,
  Space,
} from "@pankod/refine-antd";

import React, { useEffect } from "react";
// import { BreadCrumb } from "components/common/BreadCrumb";

import { useNavigation, useShow } from "@pankod/refine-core";
import { useState } from "react";

const { Title, Text } = Typography;

export const LocationsList = () => {
  const [form] = Form.useForm();
  const { edit, create, show } = useNavigation();
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { tableProps, searchFormProps, setFilters } = useTable<any>({
    resource: "location",
    metaData: {
      fields: [
        "id",
        "city",
        "state",
        "country",
        "zipcode",
        "address",
        "created_at",
        "updated_at",
        { user: ["id", "displayName"] },
      ],
    },
    onSearch: (value: any) => [
      {
        field: "address",
        operator: "contains",
        value: `%${value.q}%`,
      },
    ],

    initialSorter: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: "location",
    action: "create",
    redirect: false,
  });

  // Edit Vehicle Make Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<any>({
    resource: "location",
    action: "edit",
    metaData: {
      fields: [
        "id",
        "city",
        "state",
        "country",
        "zipcode",
        "address",
        "created_at",
        "updated_at",
        { user: ["id", "displayName"] },
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

  useEffect(() => {
    editFormProps.form?.setFieldsValue({
      user_id: editFormProps?.initialValues?.user?.id,
    });
  }, [editFormProps]);

  useEffect(() => {
    editFormProps.form?.setFieldsValue({
      user_id: createFormProps?.initialValues?.user?.id,
    });
  }, [createFormProps]);

  console.log("editFormProps", editFormProps);

  const { queryResult, setShowId } = useShow<any>({
    resource: "customers",
    metaData: {
      fields: ["id", "name", "phone_no", "role"],
    },
  });

  // Customers List
  const { selectProps: customerSelectProps } = useSelect<any>({
    resource: "users_view",
    metaData: {
      fields: ["id", "display_name"],
    },
    optionValue: "id",
    optionLabel: "display_name",
  });

  // Status List
  const { selectProps: statusSelectProps } = useSelect<any>({
    resource: "enum_order_status",
    metaData: {
      fields: ["value", "comment"],
    },
    optionValue: "value",
    optionLabel: "comment",
  });

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  return (
    <>
      {" "}
      <List
        title={"Orders"}
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
        // breadcrumb={<BreadCrumb data={["Underwriting", "Client", "List"]} />}
      >
        <Form form={form} layout="inline" {...searchFormProps}>
          <Form.Item name="q">
            <Input
              style={{ minWidth: "400px", margin: "20px 0" }}
              placeholder="Search by Address"
              // onChange={(e) => {
              //   setFilters([
              //     {
              //       operator: "or",
              //       value: [
              //         {
              //           field: "nic_brn",
              //           operator: "contains",
              //           value: `%${e.target.value}%`,
              //         },
              //         {
              //           field: "firstname",
              //           operator: "contains",
              //           value: `%${e.target.value}%`,
              //         },
              //         {
              //           field: "family_name",
              //           operator: "contains",
              //           value: `%${e.target.value}%`,
              //         },
              //       ],
              //     },
              //   ]);
              // }}
            />
          </Form.Item>
        </Form>

        <Table className="custom-table" {...tableProps} rowKey="id">
          <Table.Column dataIndex={"id"} title="Id" />
          {/* <Table.Column dataIndex={"status"} title="Name" /> */}
          <Table.Column dataIndex={"city"} title="City" />
          <Table.Column dataIndex={"state"} title="State" />
          <Table.Column dataIndex={"country"} title="Country" />
          <Table.Column dataIndex={"zipcode"} title="Zipcode" />
          <Table.Column dataIndex={"address"} title="Address" />
          <Table.Column dataIndex={["user", "displayName"]} title="User" />
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
      {/* Create Modal */}
      <Modal {...createModalProps} title="Create Location">
        <Form
          {...createFormProps}
          layout="vertical"
          initialValues={{
            active: true,
          }}
        >
          <Form.Item label="Customer" name="user_id">
            <Select {...customerSelectProps} />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ZipCode"
            name="zipcode"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Addresss"
            name="address"
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
      {/* Edit Modal */}
      <Modal {...editModalProps} title="Edit Locations">
        <Form {...editFormProps} layout="vertical">
          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Zipcode"
            name="zipcode"
            rules={[
              {
                required: true,
                message: "Gender Required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Customer" name="user_id" hidden={true}>
            <Select {...customerSelectProps} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visibleShowModal}
        onCancel={() => setVisibleShowModal(false)}
        title="Show post"
      >
        <Title level={5}>Id</Title>
        <div>{record?.id}</div>

        <Title level={5}>Title</Title>
        <div>{record?.title}</div>

        <Title level={5}>Active</Title>
        <div>{`${record?.active}`}</div>
      </Modal>
    </>
  );
};
