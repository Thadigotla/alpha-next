import {
  Table,
  useTable,
  Form,
  Input,
  List,
  EditButton,
  ShowButton,
  useModalForm,
  Modal,
} from "@pankod/refine-antd";

import React from "react";
// import { BreadCrumb } from "components/common/BreadCrumb";

import { useNavigation } from "@pankod/refine-core";

 
export const UsersList = () => {

  const [form] = Form.useForm();
  const { edit, create, show } = useNavigation();
  const { tableProps, searchFormProps, setFilters } = useTable<any>({
        resource: "customers",
        metaData: {
          fields: [
            "id",
            "name",
            "phone_no",
            "uuid",
            "role",
            "created_at",
            "updated_at"
          ],
        },
        initialSorter: [
          {
            field: "created_at",
            order: "desc",
          },
        ],
 
     
      });

  
  // Create  
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: 'customers',
    action: 'create',
    // redirect: false,
    defaultVisible: true,
  });
 

    return (

       <>
               <List
          title={"Customers"}
          createButtonProps={{
            style: {
              backgroundColor: "#2a3042",
              border: "unset",
              outline: "unset",
              color: "#fff",
            },
          }}
          // breadcrumb={<BreadCrumb data={["Underwriting", "Client", "List"]} />}
        >
          <Form form={form} layout="inline" {...searchFormProps}>
            <Form.Item name="q">
              <Input
                style={{ minWidth: "400px", margin: "20px 0" }}
                placeholder="Search NIC, First Name, Last Name"
                onChange={(e) => {
                  setFilters([
                    {
                      operator: "or",
                      value: [
                        {
                          field: "nic_brn",
                          operator: "contains",
                          value: `%${e.target.value}%`,
                        },
                        {
                          field: "firstname",
                          operator: "contains",
                          value: `%${e.target.value}%`,
                        },
                        {
                          field: "family_name",
                          operator: "contains",
                          value: `%${e.target.value}%`,
                        },
                      ],
                    },
                  ]);
                }}
              />
            </Form.Item>
          </Form>
    
          <Table className="custom-table" {...tableProps} rowKey="id">
            <Table.Column dataIndex={"id"} title="Id" />
            <Table.Column dataIndex={"name"} title="Name" />
            <Table.Column dataIndex={"phone_no"} title="Phone No" />
            <Table.Column dataIndex={"role"} title="Role" />
            <Table.Column dataIndex={"created_at"} title="Created At" />
            <Table.Column dataIndex={"updated_at"} title="Updated At" />

            <Table.Column<any>
              title="Actions"
              dataIndex="actions"
              render={(_, record) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <EditButton
                    style={{ marginRight: "0.5rem" }}
                    hideText
                    size="small"
                    onClick={() => edit("clients", record.uuid)}
                  >
                    Edit
                  </EditButton>
                  <button  />
                </div>
              )}
            />
          </Table>
        </List>

      {/* Create Modal */}
      <Modal {...createModalProps}  title='Create Customers'>
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
</>



      
      );
};