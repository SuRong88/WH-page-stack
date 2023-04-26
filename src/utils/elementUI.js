import Vue from 'vue';
import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tag,
		Tree,
    Alert,
    Icon,
    Row,
    Col,
    Upload,
    Card,
    Collapse,
    CollapseItem,
    Cascader,
    CascaderPanel,
		ColorPicker,
    Image,
    Backtop,
    Loading,
    MessageBox,
    Message,
    Notification,
		Drawer,
    Divider
} from 'element-ui';

export default Vue => {
    Vue.prototype.$ELEMENT = {
        size: 'small',
        zIndex: 3000
    };

    Vue.use(Pagination);
    Vue.use(Dialog);
    Vue.use(Autocomplete);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Input);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(RadioButton);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Switch);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(DatePicker);
    Vue.use(Popover);
    Vue.use(Tooltip);
    Vue.use(Breadcrumb);
    Vue.use(BreadcrumbItem);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Tag);
		Vue.use(Tree);
    Vue.use(Alert);
    Vue.use(Icon);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Upload);
    Vue.use(Card);
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Cascader);
    Vue.use(CascaderPanel);
		Vue.use(ColorPicker);
    Vue.use(Image);
    Vue.use(Backtop);
		Vue.use(Drawer);
		Vue.use(Divider);
    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
    Vue.prototype.$alert = MessageBox.alert;
};
