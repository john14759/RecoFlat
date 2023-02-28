type PageProps = {
  switchTo: (newPage: string) => void;
}

type BodyProps = {
  page: string;
  switchTo: (newPage: string) => void;
};

type Flat = {
  _id: number;
  block: string;
  flat_model: string;
  flat_type: string;
  floor_area_sqm: string;
  lease_commence_date: string;
  month: string;
  remaining_lease: string;
  resale_price: number;
  storey_range: string;
  street_name: string;
  town: string;
}

export type { PageProps, Flat ,BodyProps}