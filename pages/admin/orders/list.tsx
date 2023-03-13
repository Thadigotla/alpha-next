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

import React from "react";
// import { BreadCrumb } from "components/common/BreadCrumb";
import moment from "moment";
import { useNavigation, useShow } from "@pankod/refine-core";
import { useState } from "react";
// import { Link } from "@pankod/refine-react-router-v6";

const { Title, Text } = Typography;

export const AdminOrdersList = () => {
  const [form] = Form.useForm();
  const { edit, create, show } = useNavigation();
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { tableProps, searchFormProps, setFilters } = useTable<any>({
    resource: "order_payments",
    metaData: {
      fields: [
        "order_id",
        "order_uid",
        "order_user_id",
        "order_status",
        "order_total_amount",
        "payment_uid",
        "payment_status",
        "payment_amount_subtotal",
        "payment_amount_total",
        "payment_amount_discount",
        "payment_total_amount",
        "payment_customer_details",
        "user_name",
        "city",
        "state",
        "country",
        "postal_code",
        "address_1",
        "address_2",
        "email_id",
        "fullname",
        "phone_no",
        "order_created_at",
        "order_updated_at",

        // { user: ["id", "displayName"] },
        // { payments: ["id", "total_amount","status","amount_subtotal","amount_total","amount_discount"] },
        // { user: ["id", "displayName"] },
      ],
    },
    // metaData: {
    //   fields: [
    //     "id",
    //     "status",
    //     // "uuid",
    //     "test_type",
    //     "quantity",
    //     "created_at",
    //     "updated_at",
    //     { customer: ["id", "displayName"] },
    //     { product: ["id", "name"] },
    //   ],
    // },
    onSearch: (value: any) => [
      {
        field: "test_type",
        operator: "contains",
        value: `%${value.q}%`,
      },
    ],

    initialSorter: [
      {
        field: "order_created_at",
        order: "desc",
      },
    ],
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: "orders",
    action: "create",
    redirect: false,
  });

  // Edit Vehicle Make Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<any>({
    resource: "orders",
    action: "edit",
    metaData: {
      fields: [
        "id",
        "status",
        // "uuid",
        "created_at",
        "updated_at",
        // { user: ["id", "displayName"] },
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

  // useEffect(() => {
  //   editFormProps.form?.setFieldsValue({
  //     customer_id: editFormProps?.initialValues?.customer?.id,
  //   });
  //   editFormProps.form?.setFieldsValue({
  //     product_id: editFormProps?.initialValues?.product?.id,
  //   });
  // }, [editFormProps]);
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

  // Customers List
  const { selectProps: productSelectProps } = useSelect<any>({
    resource: "products",
    metaData: {
      fields: ["id", "name"],
    },
    optionValue: "id",
    optionLabel: "name",
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
        // createButtonProps={{
        //   style: {
        //     backgroundColor: "#2a3042",
        //     border: "unset",
        //     outline: "unset",
        //     color: "#fff",
        //   },
        //   onClick: () => {
        //     createModalShow();
        //   },
        // }}
        // breadcrumb={<BreadCrumb data={["Underwriting", "Client", "List"]} />}
      >
        <Form form={form} layout="inline" {...searchFormProps}>
          <Form.Item name="q">
            <Input
              style={{ minWidth: "400px", margin: "20px 0" }}
              placeholder="Search by Type"
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
          {/* <Table.Column dataIndex={"order_id"} title="Id" 
                      render={(val) => (<Link to={`/admin/order/detail/${val}`}>{val}</Link>)}/> */}
          <Table.Column
            dataIndex={"order_uid"}
            render={(val, record: any) => (
              <div></div>
              // <Link to={`/admin/order/detail/${record.order_id}`}>{val}</Link>
            )}
            title="Id"
          />

          {/* <Table.Column dataIndex={"status"} title="Name" /> */}
          <Table.Column dataIndex={"user_name"} title="User " />
          <Table.Column dataIndex={"payment_uid"} title="Pay_Id" />
          <Table.Column dataIndex={"order_status"} title="Status" />
          <Table.Column dataIndex={"order_total_amount"} title="Total" />
          <Table.Column dataIndex={"payment_status"} title="Pay_Status" />
          <Table.Column
            dataIndex={"payment_amount_subtotal"}
            title="Sub_Total"
          />
          <Table.Column
            dataIndex={"payment_amount_discount"}
            title="Discount"
          />
          <Table.Column dataIndex={"payment_total_amount"} title="Total" />
          <Table.Column dataIndex={"city"} title="City" />
          <Table.Column dataIndex={"state"} title="State" />
          <Table.Column dataIndex={"country"} title="Country" />
          <Table.Column dataIndex={"postal_code"} title="PostalCode" />
          <Table.Column dataIndex={"address_1"} title="Address_1" />
          <Table.Column dataIndex={"address_2"} title="Address_2" />
          <Table.Column dataIndex={"fullname"} title="Fullname" />
          <Table.Column dataIndex={"phone_no"} title="Phone_No" />

          {/* <Table.Column
            dataIndex={["user", "displayName"]}
            title="Customer"
          /> */}
          <Table.Column
            dataIndex={"order_created_at"}
            width={500}
            render={(val) => moment(val).format("Do-MMMM-YYYY,h:mma")}
            title="Created_At"
          />
          <Table.Column
            dataIndex={"order_updated_at"}
            width={200}
            render={(val) => moment(val).format("Do-MMMM-YYYY,h:mma")}
            title="Updated_At"
          />

          <Table.Column<any>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record: any) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.order_id}
                  onClick={() => editModalShow(record.order_id)}
                />
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
      {/* Create Modal */}
      <Modal {...createModalProps} title="Create Order">
        <Form
          {...createFormProps}
          layout="vertical"
          initialValues={{
            active: true,
          }}
        >
          {/* <Form.Item
            label='Customer'
            name='customer'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Customer"
            name="customer_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...customerSelectProps} />
          </Form.Item>

          <Form.Item
            label="Product"
            name="product_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select mode="multiple" {...productSelectProps} />
          </Form.Item>

          {/* <Form.Item
            label='Status'
            name='status'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...statusSelectProps} />
          </Form.Item>

          <Form.Item
            label="Test Type"
            name="test_type"
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
          layout="vertical"
          // initialValues={{
          //   active: true,
          // }}
        >
          {/* <Form.Item
            label='Customer'
            name='customer'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          {/* 
          <Form.Item label="Customer" name="customer_id">
            <Select {...customerSelectProps} />
          </Form.Item> */}
          {/* <Form.Item
            label="Product"
            name="product_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...productSelectProps} />
          </Form.Item> */}

          {/* <Form.Item
            label='Status'
            name='status'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item label="Status" name="status">
            <Select {...statusSelectProps} />
          </Form.Item>

          {/* <Form.Item
            label="Test Type"
            name="test_type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}
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
