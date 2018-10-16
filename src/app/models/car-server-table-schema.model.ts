export interface CustomerTableSchema {
  cs_auto_no: string;
  cs_no: string;
  cs_name: string;
  cs_id?: string;
  cs_tel1?: string;
  cs_tel2?: string;
  region_no1?: string;
  region_no1_1?: string;
  cs_addr1?: string;
  region_no2?: string;
  region_no2_1?: string;
  cs_addr2?: string;
  taxyn?: string;
  identify_id?: string;
  cs_bankid?: string;
  cs_memo?: string;
  active?: string;
  cs_fax?: string;
  cs_mobile_phone1?: string;
  cs_mobile_phone2?: string;
  invoice_title?: string;
  invoice_addr?: string;
  invoice_mail_addr?: string;
  payment_method?: string;
  settle_day?: string;
  tax_method?: string;
  creation_by?: string;
  creation_date?: string;
  last_update_by?: string;
  last_update_date?: string;
  company?: string;
  is_mail?: string;
  mail_counter?: string;
  sort?: string;
  book_loc?: string;
  mail_no?: string;
  letter?: string;
}

export interface carTableSchema {
  cr_auto_no: string;
  cr_no: string;
  cr_cs: string;
  cr_memo: string;
  active: string;
  upusr: string;
  updat: string;
  cr_cs_no: string;
  type_code: string;
  creation_date: string;
  creation_by: string;
  last_update_date: string;
  last_update_by: string;
  driver: string;
}
