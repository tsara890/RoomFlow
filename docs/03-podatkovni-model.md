# Podatkovni model

```
Enum user_role {
  USER
  MANAGER
  ADMIN
}

Enum reservation_status {
  PENDING
  CONFIRMED
  REJECTED
  CANCELLED
}

Table users {
  id uuid [pk, default: `gen_random_uuid()`]
  name varchar(100) [not null]
  email varchar(255) [unique, not null]
  role user_role [not null, default: 'USER']
  created_at timestamptz [not null, default: `now()`]
}

Table rooms {
  id uuid [pk, default: `gen_random_uuid()`]
  name varchar(100) [not null]
  building varchar(100) [not null]
  floor int [not null]
  capacity int [not null]
  equipment text
  is_active boolean [not null, default: true]
}

Table reservations {
  id uuid [pk, default: `gen_random_uuid()`]

  user_id uuid [not null]
  room_id uuid [not null]

  start_time timestamptz [not null]
  end_time timestamptz [not null]

  purpose varchar(255)
  status reservation_status [not null, default: 'PENDING']
  is_special boolean [not null, default: false]
  created_at timestamptz [not null, default: `now()`]
}

Ref: reservations.user_id > users.id // N : 1
Ref: reservations.room_id > rooms.id // N : 1
```

![diagram](image.png)