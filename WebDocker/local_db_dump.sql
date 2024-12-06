--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: vactive; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.vactive AS ENUM (
    'Active',
    'Suspended'
);


ALTER TYPE public.vactive OWNER TO postgres;

--
-- Name: vapprove; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.vapprove AS ENUM (
    'Approved',
    'Unapproved'
);


ALTER TYPE public.vapprove OWNER TO postgres;

--
-- Name: vrole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.vrole AS ENUM (
    'Admin',
    'Writer'
);


ALTER TYPE public.vrole OWNER TO postgres;

--
-- Name: vstatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.vstatus AS ENUM (
    'Ongoing',
    'Completed'
);


ALTER TYPE public.vstatus OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actor_drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actor_drama (
    actor_id integer,
    drama_id integer
);


ALTER TABLE public.actor_drama OWNER TO postgres;

--
-- Name: actors_actor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actors_actor_id_seq
    START WITH 3194
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actors_actor_id_seq OWNER TO postgres;

--
-- Name: actors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actors (
    actor_id integer DEFAULT nextval('public.actors_actor_id_seq'::regclass) NOT NULL,
    actor_name character varying(50),
    country integer,
    birth_date character varying(12),
    actor_poster text
);


ALTER TABLE public.actors OWNER TO postgres;

--
-- Name: avail_drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.avail_drama (
    avail_id integer,
    drama_id integer
);


ALTER TABLE public.avail_drama OWNER TO postgres;

--
-- Name: availability; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.availability (
    avail_id integer NOT NULL,
    availability character varying(20)
);


ALTER TABLE public.availability OWNER TO postgres;

--
-- Name: award_drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.award_drama (
    award_id integer,
    drama_id integer
);


ALTER TABLE public.award_drama OWNER TO postgres;

--
-- Name: awards_award_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.awards_award_id_seq
    START WITH 8001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.awards_award_id_seq OWNER TO postgres;

--
-- Name: awards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.awards (
    award_id integer DEFAULT nextval('public.awards_award_id_seq'::regclass) NOT NULL,
    award text
);


ALTER TABLE public.awards OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    START WITH 7001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_id_seq OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer DEFAULT nextval('public.comment_id_seq'::regclass) NOT NULL,
    drama_id integer,
    rate integer,
    comment text,
    approval public.vapprove,
    username character varying(30),
    created_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: countries_country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.countries_country_id_seq OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    country_id integer DEFAULT nextval('public.countries_country_id_seq'::regclass) NOT NULL,
    country character varying(15)
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: drama_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drama_id_seq
    START WITH 1061
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.drama_id_seq OWNER TO postgres;

--
-- Name: dramas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dramas (
    drama_id integer DEFAULT nextval('public.drama_id_seq'::regclass) NOT NULL,
    title character varying(50),
    poster character varying(255),
    release_d character varying(5),
    rating numeric,
    country integer,
    trailer character varying(255),
    alt_title character varying(50),
    approval public.vapprove,
    status public.vstatus,
    synopsis text
);


ALTER TABLE public.dramas OWNER TO postgres;

--
-- Name: genre_drama; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre_drama (
    drama_id integer NOT NULL,
    genre_id integer NOT NULL
);


ALTER TABLE public.genre_drama OWNER TO postgres;

--
-- Name: genres_genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_genre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_genre_id_seq OWNER TO postgres;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    genre_id integer DEFAULT nextval('public.genres_genre_id_seq'::regclass) NOT NULL,
    genres character varying(20)
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_seq
    START WITH 6001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_seq'::regclass) NOT NULL,
    username character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    password text,
    role public.vrole,
    google_id character varying(255),
    created_at date,
    status public.vactive
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.wishlist_id_seq
    START WITH 9001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.wishlist_id_seq OWNER TO postgres;

--
-- Name: wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist (
    wishlist_id integer DEFAULT nextval('public.wishlist_id_seq'::regclass) NOT NULL,
    user_id integer,
    drama_id integer
);


ALTER TABLE public.wishlist OWNER TO postgres;

--
-- Data for Name: actor_drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actor_drama (actor_id, drama_id) FROM stdin;
3001	1022
3002	1003
3002	1005
3003	1048
3004	1040
3005	1040
3006	1017
3007	1019
3008	1042
3009	1006
3010	1017
3011	1020
3012	1022
3013	1027
3014	1050
3015	1049
3016	1010
3017	1040
3017	1043
3018	1022
3019	1046
3019	1047
3020	1046
3021	1039
3022	1009
3023	1020
3024	1024
3025	1025
3026	1048
3027	1019
3028	1017
3029	1029
3030	1023
3031	1050
3032	1030
3033	1023
3034	1018
3035	1002
3036	1021
3037	1026
3038	1018
3039	1012
3039	1013
3039	1014
3039	1015
3039	1016
3040	1024
3041	1050
3042	1045
3043	1023
3044	1046
3045	1032
3045	1033
3046	1017
3047	1006
3047	1007
3047	1008
3048	1020
3049	1024
3050	1045
3051	1012
3051	1013
3051	1014
3051	1015
3051	1016
3052	1011
3053	1040
3054	1023
3055	1018
3056	1050
3057	1045
3058	1011
3059	1048
3060	1028
3060	1029
3061	1045
3062	1012
3062	1013
3062	1014
3062	1015
3062	1016
3063	1044
3064	1039
3065	1001
3066	1049
3067	1012
3067	1013
3067	1014
3067	1015
3067	1016
3068	1046
3069	1022
3070	1045
3071	1007
3071	1008
3072	1009
3072	1010
3073	1034
3074	1041
3075	1020
3076	1005
3077	1004
3078	1050
3079	1050
3080	1020
3081	1030
3082	1019
3083	1021
3084	1030
3085	1018
3086	1048
3087	1024
3088	1017
3089	1042
3090	1005
3091	1042
3091	1044
3092	1011
3093	1009
3094	1006
3094	1007
3094	1008
3095	1024
3096	1020
3097	1003
3098	1005
3099	1021
3100	1001
3101	1001
3102	1005
3103	1021
3104	1004
3105	1004
3106	1003
3107	1049
3108	1021
3109	1003
3110	1021
3111	1011
3112	1019
3113	1031
3114	1048
3115	1047
3116	1050
3117	1012
3117	1013
3118	1035
3118	1036
3118	1037
3118	1038
3119	1047
3120	1019
3121	1035
3121	1036
3121	1037
3121	1038
3121	1039
3122	1025
3122	1026
3123	1030
3124	1018
3125	1030
3126	1017
3127	1023
3128	1018
3129	1049
3130	1030
3131	1024
3132	1023
3133	1014
3133	1015
3133	1016
3134	1005
3135	1003
3136	1045
3137	1041
3138	1046
3139	1022
3140	1018
3141	1049
3142	1011
3143	1048
3144	1040
3145	1009
3146	1027
3147	1012
3147	1013
3147	1014
3147	1015
3147	1016
3148	1012
3148	1013
3148	1014
3148	1015
3148	1016
3149	1050
3150	1025
3151	1007
3151	1008
3152	1017
3153	1019
3154	1003
3155	1041
3156	1044
3157	1039
3158	1035
3158	1036
3158	1037
3158	1038
3158	1039
3159	1021
3160	1001
3161	1005
3162	1031
3163	1041
3163	1042
3163	1043
3164	1009
3164	1010
3165	1028
3165	1029
3166	1046
3167	1045
3168	1035
3168	1036
3168	1037
3168	1038
3169	1047
3170	1004
3170	1005
3171	1035
3171	1036
3171	1037
3171	1038
3172	1004
3173	1001
3174	1006
3174	1007
3174	1008
3175	1022
3176	1011
3177	1010
3178	1022
3179	1019
3180	1030
3180	1032
3180	1033
3180	1034
3181	1006
3181	1008
3182	1020
3183	1023
3184	1011
3185	1004
3186	1001
3187	1003
3188	1001
3189	1004
3190	1002
3191	1039
3192	1024
3193	1049
3194	1054
3195	1059
3196	1060
3197	1054
3198	1051
3199	1060
3200	1054
3201	1053
3202	1051
3203	1056
3203	1057
3203	1059
3204	1055
3205	1055
3206	1059
3207	1055
3208	1052
3209	1052
3210	1058
3210	1059
3211	1056
3212	1053
3213	1058
3214	1057
3215	1051
3216	1056
3216	1057
3217	1053
3218	1056
3218	1057
3219	1052
3199	1061
3046	1061
3102	1061
\.


--
-- Data for Name: actors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actors (actor_id, actor_name, country, birth_date, actor_poster) FROM stdin;
3002	Ahn Bo-hyun	4012	1995-08-29	https://upload.wikimedia.org/wikipedia/commons/e/e6/20230630_Ahn_Bo-hyun_%28%EC%95%88%EB%B3%B4%ED%98%84%29_2023_02.jpg
3003	Aidan Gillen	4008	1995-08-30	https://i.pinimg.com/736x/08/1c/cb/081ccb2e20d23009da63fbb4b4a0d3bc.jpg
3004	Aishwarya Rai Bachchan	4006	1995-08-31	https://i.pinimg.com/736x/75/91/5a/75915a4a855c259b45ba4c4b27d08b83.jpg
3005	Alia Bhatt	4006	1990-03-11	https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Alia_Bhatt%2C_Chennai_%28cropped_2%29.jpg/640px-Alia_Bhatt%2C_Chennai_%28cropped_2%29.jpg
3006	Alisha Boe	4017	1987-05-01	https://media.themoviedb.org/t/p/w500/qsg2aGkJ25fD67AnVdQZB6Ho8CX.jpg
3007	Amanda Abbington	4016	1987-05-02	https://ntvb.tmsimg.com/assets/assets/508205_v9_bb.jpg
3008	Amitabh Bachchan	4006	1987-05-03	https://i.pinimg.com/736x/d6/da/ae/d6daaea7ac8e88f3efe6f549a02571a2.jpg
3009	Aml Ameen	4016	1990-03-02	https://thumbs.dreamstime.com/b/aml-ameen-los-angeles-ca-march-world-premiere-gringo-l-live-regal-cinemas-%C2%A9-paul-smith-featureflash-166800937.jpg
3010	Amy Hargreaves	4017	1990-03-03	https://media.themoviedb.org/t/p/w500/jwE1G6jVtBi20ZGjC8U4GOWSIxw.jpg
3011	Amy Smart	4017	1990-03-08	https://image.tmdb.org/t/p/original/byLbVH8smwtJ5L6S7VoWmNf9yxn.jpg
3012	Andrea Dian	4007	1990-03-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/7G9jaBQ437o4GSbefmsUHwjcOQv.jpg
3013	Andrew Garfield	4017	1990-03-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5ydZ6TluPtxlz5G8nlWMB7SGmow.jpg
3014	Angela Goethals	4017	1991-06-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/uX0ZLfklHtIk4IHZqduEvlOiNBL.jpg
3015	Annie Potts	4017	1991-06-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/tlGnlsTOLiGO5xNGEnTZI4psmEp.jpg
3016	Ansel Elgort	4017	1991-06-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/pbU6qz8eudly20UE6u9T7jUXTgT.jpg
3017	Anushka Sharma	4006	1991-06-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fPhX9mefBzco5ntQUZNJZG56Gbi.jpg
3018	Ari Irham	4007	1991-06-06	https://i.pinimg.com/originals/1d/98/ed/1d98ed43baea2bba35d2e704570f24a9.jpg
3019	Ario Bayu	4007	1991-06-07	https://thumb.viva.co.id/media/frontend/tokoh/2018/11/05/5be021d0b23f6-ario-bayu_216_287.jpg
3020	Arya Saloka	4007	1990-03-04	https://i.pinimg.com/736x/ea/08/12/ea08122a4f4f6129b2fbb39dca9a61d9.jpg
3021	Asami Seto	4009	1990-03-05	https://www.animenewsnetwork.com/images/encyc/P95225-2151404557.1548733795.jpg
3022	Ashley Judd	4017	1990-03-06	https://i.pinimg.com/474x/56/88/a6/5688a659300039f3e7d7eb90f237e9e4.jpg
3023	Ashton Kutcher	4017	2001-03-03	https://www.onthisday.com/images/people/ashton-kutcher.jpg
3024	Aya Asahina	4009	2001-03-04	https://images.soco.id/202-53209101_361751711340342_6679762755854375410_n.jpg.jpeg
3025	Ben Affleck	4017	2000-11-30	https://cdn.britannica.com/33/242333-050-95A19CE8/Actor-Ben-Affleck-premiere-AIR-March-2023.jpg
3026	Ben Hardy	4016	2000-12-01	https://media.themoviedb.org/t/p/w500/b20ijbr2tbqlGvqZgkCpNZ5AYvS.jpg
3027	Benedict Cumberbatch	4016	2000-12-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fBEucxECxGLKVHBznO0qHtCGiMO.jpg
3028	Brandon Flynn	4017	2000-12-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/b1pEWBm0g2dxoNg1hX2d8My92Q8.jpg
3029	Brian Tyree Henry	4017	2000-12-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/2MsJh0bpyzwvOUnXOltHp3j85Pb.jpg
3030	Caleb McLaughlin	4017	2000-12-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/6YjorSZyqFBl3f4sgcCQmOc1yoi.jpg
3031	Catherine O'Hara	4002	2000-12-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gI2RyymLJ9ZrhEyJSD5EqSvFpCX.jpg
3032	Chad Lindberg	4017	2000-12-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/sUaxwqrwYjZGtLcRH3rsyBd1L9d.jpg
3033	Charlie Heaton	4016	2000-12-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/8Se6WZuvRmoB990bT29OPgVAyBo.jpg
3034	Chloë Grace Moretz	4017	2000-12-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/2Tlg632tAkfZNlnoF8CV8F9Pf63.jpg
3035	Cho Dong-hyuk	4012	2000-12-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/kS6Wu70u5wrzLvCaWgSJI8cfWPM.jpg
3036	Choi Hyun-Wook	4012	1995-09-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/o0Fl7HkkRgOTAOHDCy7JqIu7UoE.jpg
3037	Cillian Murphy	4008	1995-09-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3EVHIa5jvdMER0iLI7QOgs6FTCb.jpg
3038	Clark Gregg	4017	1995-09-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/nbxFbr2SaF4Sdc6HdsF193GInvJ.jpg
3039	Daniel Radcliffe	4016	1987-05-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg
3040	Daniel Rindress-Kay	4002	1987-05-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bnftfIvk8m39BPFdYR53TgpeWPv.jpg
3041	Daniel Stern	4017	2001-02-28	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/939oerf8bJPrqT2a0N0oGuM1bjn.jpg
3042	Darby Stanchfield	4017	2001-03-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/eA0QwMg0HuB8NmBcjnP62UeuZnL.jpg
3043	David Harbour	4017	2001-03-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/chPekukMF5SNnW6b22NbYPqAStr.jpg
3044	Dian Sastrowardoyo	4007	2000-09-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/qiQlcUrEjP0HdLZCeMm8Cc4a0yE.jpg
3045	Dwayne Johnson	4017	2000-09-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5QApZVV8FUFlVxQpIK3Ew6cqotq.jpg
3046	Dylan Minnette	4017	2000-09-11	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/lGbZoPGTO4JYsiEXNtKpdEp6oMb.jpg
3047	Dylan O'Brien	4017	1977-12-31	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/xN3GdvIlqsR838gDoblhPH0numP.jpg
3048	Elden Henson	4017	1978-01-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/8U5g30U76UJe0erbJdWjGLVz7NF.jpg
3049	Eleanor Noble	4002	1978-01-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/kCbQ95ZhPN5hpSIcpaA2p80M2gl.jpg
3050	Emilia Jones	4016	1978-01-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/vQHfiR6bSKf7bJcYyDvfUSXlB9Q.jpg
3051	Emma Watson	4016	1978-01-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/A14lLCZYDhfYdBa0fFRpwMDiwRN.jpg
3052	Eugene Cordero	4017	1978-01-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/waruLSR8lXBjhAFL0J6ihuVY62d.jpg
3053	Fawad Khan	4011	1990-03-12	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/zHvstgZfyb5AwEQfrWHV3bsjKV1.jpg
3054	Gaten Matarazzo	4017	1990-03-13	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/sUHpObjk9EkRVfpAY0auTZj3xx5.jpg
3055	Geoffrey Arend	4017	2002-10-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bpqF3V5lK5GxuIU4VuTaVaztIvw.jpg
3056	Gerry Bamman	4017	2002-10-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hiMgT6OYvmdgz758vbw4y9iEAns.jpg
3057	Griffin Gluck	4017	2002-10-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/j7KSBKYLgnLxkZfhQ679HRSDIjj.jpg
3058	Gugu Mbatha-Raw	4016	2002-10-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jjj4092Ank01voBjDrppO32K5yl.jpg
3059	Gwilym Lee	4016	2002-10-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/k6geayRL4wHLboFZpQYdkouQpvJ.jpg
3060	Hailee Steinfeld	4017	2002-10-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/dxSDWkiVaC6JYjrV3XRAZI7HOSS.jpg
3061	Hallea Jones	4002	2002-10-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/7wErUluYAfRVHb3z9b35DS3pFcP.jpg
3062	Harry Melling	4016	1995-09-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/b0pHwi2MeqxEpeWnF4Llihu53aJ.jpg
3063	Harshaali Malhotra	4006	1995-09-06	https://i.pinimg.com/736x/34/79/c7/3479c76e15e54f44645c4f1842c4a8ae.jpg
3064	Hitomi Nabatame	4009	1995-09-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jidfw5qDgZjC4TPY3YunJQxlEmr.jpg
3065	Hyun Bin	4012	1995-09-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/JQFzhO9j8HRiyr7leGPj6cqhvM.jpg
3066	Iain Armitage	4017	1977-12-28	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/d16P91j8fhw7ngR727M84rCrj4r.jpg
3067	Ian Hart	4016	1977-12-29	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/xMC8aPDwhEZcjRHEFcgytSr3BzM.jpg
3068	Ibnu Jamil	4007	1977-12-30	https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/jawapos/2017/04/ibnu-jamil-digugat-cerai-tetapi-masih-serumah_m_120196.jpeg
3069	Iqbaal Dhiafakhri Ramadhan	4007	1999-02-15	https://ffis3.is3.cloudhost.id/profile/photo/327/Iqbaal-Ramadhan.jpg
3070	Jackson Robert Scott	4017	1999-02-16	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9TUjEFyHfqnVLzExlKGv26RSFAn.jpg
3071	Jacob Lofland	4017	1999-02-17	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hlDVsEhgvNX5xnAcqX3HaBXAgNS.jpg
3072	Jai Courtney	4001	1999-02-18	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mwQ7aNiPYAbVi9jAEr99On7Y4zb.jpg
3073	Jason Statham	4016	1993-05-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/whNwkEQYWLFJA8ij0WyOOAD5xhQ.jpg
3074	Jaya Bachchan	4006	1993-05-07	https://upload.wikimedia.org/wikipedia/commons/1/1d/Jaya_Bachchan_2024.jpg
3075	Jesse James	4017	1993-05-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/icZHNGVvuSCthiql6sB0jC6ppZc.jpg
3076	Jin Goo	4012	2000-06-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jL0bhHE8vIEomP1Zdz3a0ryXXgk.jpg
3077	Jo Han-chul	4012	2000-06-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/58DGEXFyWfaFdqL7yKKW0VdEg3R.jpg
3078	Joe Pesci	4017	2000-06-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/4AO0Rwdg2ky8Usmgzgj0dvhy7Zw.jpg
3079	John Heard	4017	2000-06-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/zjhcxrCFK4q0C1gtVmeN8FeqCw0.jpg
3080	John Patrick Amedori	4017	2000-06-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/is4Tvt9xLdWa29AvgHTsOykLB1T.jpg
3081	Johnny Strong	4017	2000-06-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/zMe5hbmaMA5Jr6uVwtojusANaCg.jpg
3082	Jonathan Aris	4016	2000-06-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/46T3x7CePc22Z5KvkR4OulmVORU.jpg
3083	Joo Bo Young	4012	1999-03-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/t7AoYjJdumIHgWAP7tJrIDXSJa0.jpg
3084	Jordana Brewster	4017	1992-04-27	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/8VzFsSfT7NnMGyH5JQBQdTxDHcO.jpg
3085	Joseph Gordon-Levitt	4017	1992-04-28	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/msb9UCBqBjGC95r7jns9K0C820h.jpg
3086	Joseph Mazzello	4017	1992-04-29	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/44gsv7TlXOOKDGg5aRtqxZjM9ae.jpg
3087	Juliette Gosselin	4002	1992-04-30	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mee5liXgHklccsrP8alyWJw7gGy.jpg
3088	Justin Prentice	4017	1992-05-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/yPH93Xgg5otKrDMn3Pb1Xbd8Yhm.jpg
3089	Kajol	4006	1992-05-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/h4m0TkDuEMCUNaPrQxMRyFb2AQ7.jpg
3090	Kang Shin-il	4012	1992-05-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/iQhXXV8Wsv2ZHifZqaIm1fJsW7F.jpg
3091	Kareena Kapoor	4006	1992-05-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/pJZJJ93NwJq3kb3RWtaZBYVga1x.jpg
3092	Kate Dickie	4016	1992-05-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mlFYUmZycpRa7TGgDTfP0xanE1Q.jpg
3093	Kate Winslet	4016	1990-03-14	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/e3tdop3WhseRnn8KwMVLAV25Ybv.jpg
3094	Kaya Scodelario	4016	1990-03-15	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/oKsGrXKGrcVoQJQ6pbjZDPOQJcM.jpg
3095	Kento Yamazaki	4009	1990-03-16	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/nUWXgjDfRxFJ3P20lyMJr8qDIJ0.jpg
3096	Kevin G. Schmidt	4017	1990-03-17	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/tRRGseAd5mjHAPG75deffeE8ZKb.jpg
3097	Kim Dong-Hee	4012	1990-03-18	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hrW8nWYzGmm3StKdHuHQMGk23Kj.jpg
3098	Kim Ji-won	4012	1990-03-19	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/lX7W1j9kg4jV6XNn5XEE3rKsd3x.jpg
3099	Kim Ji-yeon	4012	1995-09-04	https://i.pinimg.com/736x/b6/d4/38/b6d43816fffdcadeccbe3f3baecfaacb.jpg
3100	Kim Jung-hyun	4012	1996-01-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/nijQggyjrCX32wfahbWzTW3S1OQ.jpg
3101	Kim Jung-nan	4012	1996-01-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/guaDtVcObvkRj2Jmku4kGw1HOVD.jpg
3102	Kim Min-Seok	4012	1996-01-03	https://i.pinimg.com/736x/94/ba/38/94ba3818072f3b137892026609a50882.jpg
3103	Kim Tae-Ri	4012	1996-01-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gFofVUeVlIvBJMUv7maHQwWdfsk.jpg
3104	Kim Yeo-jin	4012	1996-01-05	https://cdn.idntimes.com/content-images/community/2021/03/116002203-154221386257072-4057299668276768530-n-cb7fc610b5dd67da09ab982931f2df21-6cc902115ff70af3478fb70ffd3b62b2.jpg
3105	Kwak Dong-yeon	4012	1996-01-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/klgX8YheSFFXqEdjuCQY5rxTTGa.jpg
3106	Kwon Nara	4012	1993-05-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/4U0cNinwOf7DdsBYA3BFi7arDmz.jpg
3107	Lance Barber	4017	1996-01-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1yNWnNWN5PAE55ComenWi5chzSj.jpg
3108	Lee Joo-Myoung	4012	1996-01-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3QpMVrG7fQH0QIfvlc5LczKGTW7.jpg
3109	Lee Joo-young	4012	1996-01-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jC1mwSv2Ren44OqnKqPNSy38gs4.jpg
3110	Lee Yea Jin	4012	1996-01-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/4pT96Mgui6QnHevuPEx6jIQZu49.jpg
3111	Liz Carr	4016	2000-05-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/6BT2hgkSAPO7ceBT2VDcQT4pVSc.jpg
3112	Louise Brealey	4016	2000-05-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/c7K2WWGZVA4tKWT0gBcPoLwmz3C.jpg
3113	Lucas Black	4017	2000-05-11	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/w2oImwC4Y0RDtyvaKGTCFCKsvwh.jpg
3114	Lucy Boynton	4016	2000-05-12	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wKNUTqAfi3QW2t2MwMotwOXKkZx.jpg
3115	Lukman Sardi	4007	2000-05-13	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/pMZiVVu8k5MzGteRgpNVzMybxLm.jpg
3116	Macaulay Culkin	4017	1999-02-22	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5lSoFnWb4HmxEREqcFvBGgXu5H.jpg
3117	Maggie Smith	4016	1999-02-23	https://img-highend.okezone.com/okz/600/pictureArticle/images_8lO42C6q_m21b7G.jpg
3118	Manami Numakura	4009	1999-02-24	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/eDbMXgeTCA2D6i7894Ag43RADrk.jpg
3119	Marissa Anita	4007	1999-02-25	https://cdn0-production-images-kly.akamaized.net/4vMoDIGDJaVhWa3ZNNxwGuJ5anQ=/0x113:683x1024/800x1066/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4863879/original/087671200_1718363660-marissa_anita.jpg
3120	Mark Gatiss	4016	1999-02-26	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/jf6vBlhsDbKR8N3rjl5ulqz9ltB.jpg
3121	Masayuki Katou	4009	2002-11-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1BKgxx1FXJ99WanpgWCBRG6YOHT.jpg
3122	Matt Damon	4017	2002-11-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/At3JgvaNeEN4Z4ESKlhhes85Xo3.jpg
3123	Matt Schulze	4017	2002-11-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wFOVJr3dxEs5kC2rtS5iV3XbU0C.jpg
3124	Matthew Gray Gubler	4017	2002-11-10	https://i.pinimg.com/236x/0d/22/72/0d22722bfe3ac80b66c5ba7e1f4504c1.jpg
3125	Michelle Rodriguez	4017	2002-11-11	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/wVcbrae4eRqGMFZz8Eh52Dl1biP.jpg
3126	Miles Heizer	4017	1999-03-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/fQeByexqxm2W6u9p1bMRNy12VtH.jpg
3127	Millie Bobby Brown	4016	1999-03-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3Qblbk5JIMxzlGVd1k1ucSKK7rf.jpg
3128	Minka Kelly	4017	1999-03-04	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/AqiOBB4dF29sLjcnuV2QSvl2r1y.jpg
3129	Montana Jordan	4017	1999-03-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/hTWj58Uftie14O7nvT2jrSgGkst.jpg
3130	Neal H. Moritz	4017	1993-05-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/pPvK5xZTp1PymWL5OGc7dtqvx9Q.jpg
3131	Nijirô Murakami	4009	1993-05-11	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ixKuljx33a5JqY28CsdEavflS1b.jpg
3132	Noah Schnapp	4017	1993-05-12	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/3GSWWrqQjio6G8L42ugGBGNks37.jpg
3133	Pam Ferris	4016	1993-05-13	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/aVvdYkgolh22FYqqCJhVO8jd7To.jpg
3134	Park Hoon	4012	1999-02-27	https://i.mydramalist.com/RQ0YP_5c.jpg
3135	Park Seo-joon	4012	1994-12-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/rLAhC54IdUBRmpSRQrCC6a0wTLV.jpg
3136	Petrice Jones	4016	1994-12-11	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/76mfAsS9gKTh43d7I7mcm7Aen6t.jpg
3137	Preity Zinta	4006	1994-12-12	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/qY4GG9zj4JhgoiBaHhT5FIGeHu3.jpg
3138	Putri Marino	4007	1994-12-13	https://cdn1-production-images-kly.akamaized.net/9ZwLwbvpPWFvomLYjRzZJIY09Go=/500x500/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4296485/original/072378600_1674133966-10_Gaya_Fashion_Putri_Marino_yang_Effortless_Namun_Memikat__8_.jpg
3139	Rachel Amanda	4007	1994-12-14	https://www.wowkeren.com/images/photo/rachel_amanda.jpg
3140	Rachel Boston	4017	1994-12-15	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/lXsexhIX8oMhPnO85M0ocL0GhC2.jpg
3141	Raegan Revord	4017	1994-12-16	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/odKZ08z4w8tbDXuYlZDVc0uygj0.jpg
3142	Rafael Casal	4017	1994-12-17	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9PaSpVV6aU3rtFXG7oOpnEu92gv.jpg
3143	Rami Malek	4017	1994-12-18	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ewr46CGOdsx5NzAJdIzEBz2yIQh.jpg
3144	Ranbir Kapoor	4006	1981-09-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ymYNHV9luwgyrw17NXHqbOWTQkg.jpg
3145	Ray Stevenson	4016	1981-09-10	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/msafbswGI6uisRuNvQ8a1wMF5Ca.jpg
3146	Rhys Ifans	4016	1981-09-11	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1D670EEsbky3EtO7XLG32A09p92.jpg
3147	Richard Harris	4008	1981-09-12	https://wallpapers.com/images/featured/richard-harris-vlzqe14ijqrb70el.jpg
3148	Robbie Coltrane	4016	2004-01-03	https://cdn1-production-images-kly.akamaized.net/FKKWnWfzkhNp9-9b3OE25T1TSfo=/800x1066/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4192365/original/019645100_1665791773-000_HKG2004052498544.jpg
3149	Roberts Blossom	4017	2004-01-04	https://media.themoviedb.org/t/p/w220_and_h330_face/bDeis0UZpsyzNgnpp1Wt1lC4j7d.jpg
3150	Robin Williams	4017	2004-01-05	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/iYdeP6K0qz44Wg2Nw9LPJGMBkQ5.jpg
3151	Rosa Salazar	4017	2004-01-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/f8MITeVNUrP9mMiXcPnCEZTIW56.jpg
3152	Ross Butler	4017	2004-01-07	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/asJ1bchERNBwcWS3Do7xSaYNOmX.jpg
3153	Rupert Graves	4016	1981-09-18	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/6tS8XMuTS04xXTfeWFjJED6SFBF.jpg
3154	Ryu Kyung-soo	4012	1981-09-19	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/yAHJk1EyGdGidl42ejLROxYkPPK.jpg
3155	Saif Ali Khan	4006	1981-09-20	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/85uKiFDEcIqzLh0GwqYvecXw4uA.jpg
3156	Salman Khan	4006	1981-09-21	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/n7pKtccmf2jVOz8Qn90q2ThqLge.jpg
3157	Saori Hayami	4009	1981-09-22	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gLv9lO7dlUbIsmyJUvgegqAAXki.jpg
3158	Satoshi Hino	4009	1981-09-23	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/8ZJIiwIVF2zDyyFr7oXewj0eEuu.jpg
3159	Seo Jae Hee	4012	1981-09-24	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/sysUnij3kUyYXYjFR5Qsb0Oa0XC.jpg
3160	Seo Ji-hye	4012	1981-09-25	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/7aB4Qv8Z1jj2FgfLHiuPfdGRv1.jpg
3161	Seo Jung-yeon	4012	1996-01-12	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/x7mY7M3zn4de65AGY2qXxkeVi5v.jpg
3162	Shad Moss	4017	1999-02-19	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/5cWCRms7lDSNY3NbVbKrBnnKOJA.jpg
3163	Shah Rukh Khan	4006	1999-02-20	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/tCEppfUu0g2Luu0rS5VKMoL4eSw.jpg
3164	Shailene Woodley	4017	1981-09-13	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/tqNlTcDxDFQOQi0GpEtx0lqQyWt.jpg
3165	Shameik Moore	4017	1981-09-14	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/lT3IDNtcIeSnjzOBq49FaQePmdd.jpg
3166	Sheila Dara Aisha	4007	1981-09-15	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bnCnmSsqW6nKz4LhoEKknQMJ52H.jpg
3167	Sherri Saum	4017	1981-09-16	https://static.tvtropes.org/pmwiki/pub/images/sherri_saum.jpg
3168	Shigeru Chiba	4009	1981-09-17	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mF5YJxApTYKBVFJDrEC9IrJ5ooV.jpg
3169	Sita Nursanti	4007	1981-09-18	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/1ZAhGxb25Y0znzDUggozoD9UwH6.jpg
3170	Song Joong-ki	4012	1981-09-19	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/kgjb5OppOVTh5tz3hhnfDVnTvDv.jpg
3171	Sumire Uesaka	4009	1994-12-21	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/AbouCe2WVBHvMlBm9NnG7GHyJpa.jpg
3172	Ok Taec-yeon	4012	1994-12-22	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/zVOzETmSY8weWgvyh5KCfSyDSA7.jpg
3173	Tang Joon-sang	4012	1994-12-23	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/qDSFx6uoKUEKnkXpkhWgIlkG0YL.jpg
3174	Thomas Brodie-Sangster	4016	1999-02-28	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/ovfgjgaE7aAXKYaemABX6pJFwRk.jpg
3175	Tio Pakusadewo	4007	1996-01-11	https://cdns.klimg.com/resized/476x/selebriti/Tio_Pakusadewo/p/tio-pakusadewo-212.jpg
3176	Tom Hiddleston	4016	1999-02-21	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mclHxMm8aPlCPKptP67257F5GPo.jpg
3177	Tony Goldwyn	4017	1994-12-06	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/A3hXimbzDtFxQ1PXNo8gG7RZeN4.jpg
3178	Umay Shahab	4007	1994-12-07	https://cdns.klimg.com/kapanlagi.com/p/umay1.jpg
3179	Una Stubbs	4016	1994-12-08	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/bz23ewpBlZNgSwCLqKPaa8ulKfQ.jpg
3180	Vin Diesel	4017	1994-12-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/nZdVry7lnUkE24PnXakok9okvL4.jpg
3181	Will Poulter	4016	1994-12-19	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/9blYMaj79VGC6BHTLmJp3V5S8r3.jpg
3182	William Lee Scott	4017	1994-12-20	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/p6mISLnDP84gaBOiXSpOenFO8Zd.jpg
3183	Winona Ryder	4017	1988-10-12	https://cdn.britannica.com/57/222457-050-BAA8093E/American-actress-Winona-Ryder-2019.jpg
3184	Wunmi Mosaku	4016	1988-10-13	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/mWDsVCo9sBcekrsjUTsoCFLhtYt.jpg
3185	Wyatt Bowen	4002	1988-10-14	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gnQfJPFeVTNUbCZC5EyVVZ7JvB.jpg
3186	Yang Kyung-won	4012	1988-10-15	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/g5Guqqovv98EMS4yO5tJGrWSy4v.jpg
3187	Yoo Jae-Myung	4012	1994-08-01	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/27OwsiC3j37mTpBZ6AjiNfHdNC.jpg
3188	Yoo Su-bin	4012	1994-08-02	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/vulO1ngz0s3jUBXQbW2ADuyK3Fa.jpg
3189	Yoon Byung-hee	4012	1994-08-03	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/gqc54lu89t9tGRr72Cuj4FlXNYt.jpg
3190	Yoon Song-a	4012	1994-08-04	https://asianwiki.com/images/3/39/Song_Yoon-A-p001.jpg
3191	Yoshino Aoyama	4009	1989-02-07	https://cdn.idntimes.com/content-images/community/2022/11/7-00566d8b86b15de3c44e2d24807d563e-064f533cb81a1ec5cc41cb0bd1e70b90.jpg
3192	Yûtarô Watanabe	4009	1989-02-08	https://static.lostfilm.top/Names/1/3/5/m135286.jpg
3193	Zoe Perry	4017	1989-02-09	https://media.themoviedb.org/t/p/w600_and_h900_bestv2/zkcRUV0e3jJWI89h4GR1SYxEkzY.jpg
3001	Aghniny Haque	4007	1995-08-28	https://img-z.okeinfo.net/okz/500/library/images/2023/01/14/pogfd3oeoahj57fbl7ru_20091.jpg
3194	Alan Rickman	4016	1999-03-03	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/2894_v9_ba.jpg
3195	Anthony Hopkins	4016	1999-03-04	https://resizing.flixster.com/jbz5MwVdQ59eUIp2mG61nabe9iE=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/5729_v9_bc.jpg
3196	Anthony Ramos	4017	1999-03-05	https://goldenglobes.com/wp-content/uploads/2023/10/anthony-ramos-nom-pro-gettyimages-1354775407-scaled.jpg
3197	Ben Whishaw	4017	1993-05-10	https://media.them.us/photos/61549840ea3a296dee0eb14a/1:1/w_1081,h_1081,c_limit/ben-wishaw.jpg
3198	Danny Lloyd	4017	1993-05-11	https://static.wikia.nocookie.net/headhuntershorrorhouse/images/6/60/Danny_Lloyd.jpg
3199	Dominique Fishback	4017	1993-05-12	https://static01.nyt.com/images/2023/03/16/multimedia/16swarm-fishback3-glmh/16swarm-fishback3-glmh-articleLarge.jpg
3200	Dustin Hoffman	4017	1993-05-13	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/18072_v9_bc.jpg
3201	Gabriel Byrne	4008	1999-02-27	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/255_v9_bb.jpg
3202	Jack Nicholson	4017	1994-12-10	https://californiamuseum.org/wp-content/uploads/NicholsonOscar-cropped-black-and-white.jpg
3203	Josh Duhamel	4017	1994-12-11	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/201406_v9_ba.jpg
3204	Kim Hyun-Joong	4012	1994-12-12	https://awsimages.detik.net.id/customthumb/2011/06/09/1180/Kim-HyunJoong.jpg
3205	Ku Hye-Sun	4012	1994-12-13	https://i.pinimg.com/originals/d7/89/1d/d7891df212310f84bb685e1345477b86.jpg
3206	Laura Haddock	4016	1994-12-14	https://static.wikia.nocookie.net/marvelmovies/images/f/ff/Laura_Haddock.jpg
3207	Lee Min-Ho	4012	1994-12-15	https://i.pinimg.com/736x/f3/55/dc/f355dcbc62665ec589a2e6c31af42bd7.jpg
3208	Lynn	4009	1994-12-16	https://static.wikia.nocookie.net/seiyuu/images/0/04/Lynn.jpg
3209	Mahiro Takasugi	4009	1994-12-17	https://static.wikia.nocookie.net/kamenrider/images/7/7c/Mahiro_Takasugi.jpg
3210	Mark Wahlberg	4017	1994-12-18	https://cdn.britannica.com/32/181632-004-51372707/Mark-Wahlberg-producer.jpg
3211	Megan Fox	4017	1981-09-09	https://awsimages.detik.net.id/community/media/visual/2022/05/14/megan-fox_34.jpeg
3212	Milly Shapiro	4017	1981-09-10	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1126486_v9_ba.jpg
3213	Nicola Peltz Beckham	4017	1981-09-11	https://akns-images.eonline.com/eol_images/Entire_Site/2022313/rs_1200x1200-220413132229-1200-Nicola_Peltz_Beckham.jpg
3214	Rosie Huntington-Whiteley	4016	1988-10-13	https://media.themoviedb.org/t/p/w500/oq5iX2VoLGF41P5DmNDNJcczESR.jpg
3216	Shia LaBeouf	4017	1988-10-15	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/189825_v9_bc.jpg
3217	Toni Collette	4001	1994-08-01	https://resizing.flixster.com/UVeC3-uuQX1kQ8sJjKJHytB8kVA=/fit-in/352x330/v2/http://media.baselineresearch.com/images/479872/479872_full.jpg
3218	Tyrese Gibson	4017	1994-08-02	https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/200301_v9_bc.jpg
3219	Yukiyo Fuji	4009	1994-08-03	https://image.tmdb.org/t/p/w300/tLG4K1iix3QNHFexf98mrZ25jT6.jpg
3215	Shelley Duvall	4017	1988-10-14	https://img.apmcdn.org/bc89164df531051e7ace6c47676148640fc40781/portrait/ccc2fa-20240711-portrait-of-a-blonde-woman-1558.jpg
\.


--
-- Data for Name: avail_drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.avail_drama (avail_id, drama_id) FROM stdin;
5001	1012
5001	1013
5001	1014
5001	1015
5001	1016
5001	1019
5001	1025
5001	1026
5001	1027
5001	1028
5001	1029
5001	1030
5001	1031
5001	1032
5001	1033
5001	1034
5001	1040
5001	1041
5001	1042
5001	1043
5001	1049
5001	1050
5002	1025
5002	1026
5002	1027
5002	1028
5002	1029
5002	1030
5002	1040
5002	1041
5002	1042
5002	1043
5003	1044
5004	1035
5004	1036
5004	1037
5004	1038
5004	1039
5005	1011
5005	1027
5005	1028
5005	1044
5005	1050
5007	1012
5007	1013
5007	1014
5007	1015
5007	1016
5007	1029
5013	1001
5013	1002
5013	1003
5013	1004
5013	1005
5013	1006
5013	1007
5013	1008
5013	1009
5013	1010
5013	1012
5013	1013
5013	1014
5013	1015
5013	1016
5013	1017
5013	1018
5013	1020
5013	1021
5013	1022
5013	1023
5013	1024
5013	1027
5013	1028
5013	1029
5013	1030
5013	1035
5013	1036
5013	1037
5013	1038
5013	1039
5013	1040
5013	1041
5013	1042
5013	1045
5013	1046
5013	1047
5013	1048
5013	1049
5001	1051
5001	1053
5001	1054
5001	1055
5002	1052
5010	1053
5013	1054
5013	1055
5013	1056
5013	1057
5013	1058
5013	1059
5013	1060
5016	1055
\N	1061
\.


--
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.availability (avail_id, availability) FROM stdin;
5001	Amazon Prime Video
5002	Apple TV
5003	BStation
5004	Crunchyroll
5005	Disney+
5006	Fandango at Home
5007	Google Play Movies
5008	HBO
5009	Hoopla
5010	Hulu
5011	MaxStream
5012	Microsoft Store
5013	Netflix
5014	Peacock
5015	Viki
5016	Viu
5017	Youtube
\.


--
-- Data for Name: award_drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.award_drama (award_id, drama_id) FROM stdin;
8001	1005
8002	1006
8003	1007
8004	1008
8005	1009
8006	1010
8007	1011
8008	1012
8009	1013
8010	1014
8011	1015
8012	1016
8013	1017
8014	1018
8015	1019
8016	1020
8017	1021
8018	1022
8019	1023
8020	1040
8021	1041
8022	1042
8023	1043
8024	1044
8025	1045
8026	1046
8027	1048
8028	1049
8029	1012
8030	1012
8031	1013
8032	1013
8033	1014
8034	1016
8035	1016
8036	1022
8037	1045
8038	1048
8039	1048
8040	1048
8041	1048
8042	1049
8043	1051
8044	1052
8045	1053
8046	1054
8047	1055
8048	1056
8049	1057
8050	1058
8051	1059
8052	1060
8029	1061
\.


--
-- Data for Name: awards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.awards (award_id, award) FROM stdin;
8001	Baeksang Arts Award for Best Drama
8002	2015 Nominee Golden Trailer Best Fantasy / Adventure Poster
8003	2016 Nominee Annie Outstanding Achievement in Animated Effects in a Live Action Production
8004	2018 Nominee Teen Choice Award Choice Movie: Action
8005	2014 Winner Teen Choice Award Choice Movie: Breakout Star
8006	2016 Winner ASCAP Award Top Box Office Films
8007	People's Choice Award untuk Serial TV Sci/Fi/Fantasy Favorit
8008	2002 - Critics Choice Award- Best Family Film - Live Action
8009	2003 - BAFTA Awards - Kids' Vote
8010	2005 - BAFTA  Awards - Audience Award
8011	2006 - Kids' Choice Awards - Favorite Movie
8012	2008 - People's Choice Awards - Favorite Movie Drama
8013	2020 Winner ReFrame Stamp Top 100 Popular Television (2019-2020)
8014	2009 Winner National Board of Review Top Ten Film
8015	2011 Winner Banff Rockie Award Best Continuing Series
8016	2005 Nominee Saturn Award Best Science Fiction Film
8017	2022 Indonesian Movie Actors Awards: Film Terfavorit
8018	2022 Saturn Awards: Best Streaming Horror & Thriller Series
8019	2021 Asian Academy Creative Awards: Best Visual or Special VFX in TV Series or Feature Film
8020	International Indian Film Academy Awards : Best Cinematography
8021	International Indian Film Academy Awards : Best Director
8022	International Indian Film Academy Awards : Best Dialogue
8023	Filmfare Awards : Best Supporting Actress
8024	International Indian Film Academy Awards : Best Film
8025	2020 Winner Ruderman Family Foundation Seal of Authentic Representation
8026	2024 Nominee Seoul International Drama Awards
8027	2019 Winner Academy Awards USA
8028	2023 Winner Family Film Awards
8029	2002 - ICG Publicists Awards - Motion Picture
8030	Empire Awards - The "Harry Potter" films for outstanding contribution to British cinema
8031	2003 - Critics Choice Awards - Best Family Film - Live Action
8032	2003 - Huabiao Film Awards - Outstanding Translated Foreign Film
8033	2004 - Teen Choice Awards - Choice Movie - Drama/Action Adventure
8034	2007 - Teen Choice Awards - Choice Summer Movie: Drama/Action Adventure
8035	2012 - AFI Awards - THE HARRY POTTER SERIES marks the final triumphant chapter of a landmark series
8036	Dragon Awards: Best Science Fiction or Fantasy TV Series
8037	2022 Winner The Joey Awards Vancouver
8038	2019 Winner American Cinema Editors USA
8039	2019 Cinema Audio Society USA
8040	2019 Golden Globes USA
8041	2019 Motion Picture Sound Editors USA
8042	2024 Kids Choice Awards USA
8043	2012 Winner Saturn Award Best DVD Collection
8044	2018 Nominee Anima't Award Best Feature-Length Film
8045	2019 Winner Saturn Award Legion M Breakout Director
8046	2007 Winner Film Award in Silver Outstanding Feature Film (Programmfüllende Spielfilme)
8047	2009 Winner People's Choice Award Popular Drama
8048	2010 Winner BMI Film Music Award : Film Music Steve Jablonsky
8049	2011 Winner Hollywood Film Award: Visual Effects of the Year
8050	2014 Winner Hollywood Film Award: Visual Effects of the Year
8051	2017 Winner Teen Choice Award : Choice: Fight (Bumblebee vs. Nemesis Prime) 
8052	NAACP Image Award for Outstanding Original Score for TV/Film
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, drama_id, rate, comment, approval, username, created_at) FROM stdin;
7035	1055	5	such a cute love story	Approved	admindramaku	2024-11-04
7036	1009	4	quite good	Approved	admindramaku	2024-11-04
7037	1017	4	great	Approved	admindramaku	2024-11-04
7038	1033	5	cant wait for another season	Unapproved	admindramaku	2024-11-04
7039	1005	5	cute love story	Approved	admindramaku	2024-11-04
7040	1012	4	muggles go away!	Approved	admindramaku	2024-11-04
7043	1005	5	good	Approved	nara	2024-11-11
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (country_id, country) FROM stdin;
4001	Australia
4002	Canada
4003	China
4004	England
4005	Germany
4007	Indonesia
4008	Ireland
4009	Japan
4010	Malaysia
4011	Pakistan
4012	South Korea
4013	Spain
4014	Taiwan
4015	Thailand
4016	United Kingdom
4017	United States
\.


--
-- Data for Name: dramas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dramas (drama_id, title, poster, release_d, rating, country, trailer, alt_title, approval, status, synopsis) FROM stdin;
1033	Fast Five	https://posters.movieposterdb.com/11_04/2011/1596343/l_1596343_63064b8e.jpg	2011	5.0	4017	https://www.youtube.com/embed/vcn2GOuZCKI?si=kNpz9zEvhiGeD1-k	\N	Approved	Ongoing	Dominic Toretto and his crew of street racers plan a massive heist to buy their freedom while in the sights of a powerful Brazilian drug lord and a dangerous federal agent.
1039	Overlord: The Sacred Kingdom	https://image.tmdb.org/t/p/original/fggkIB6oeVi5Mpwl0fALLVevAFN.jpg	2024	\N	4009	https://www.youtube.com/embed/vniS5g48wHA?enablejsapi=1&wmode=opaque&autoplay=1	Overlord Movie 3: Sei Oukoku-hen	Approved	Ongoing	The Sacred Kingdom has enjoyed a great many years without war thanks to a colossal wall constructed after a historic tragedy. They understand best how fragile peace can be. When the terrible demon Jaldabaoth takes to the field at the head of a united army of monstrous tribes, the Sacred Kingdom's leaders know their defenses are not enough. With the very existence of the country at stake, the pious have no choice but to seek help wherever they can get it, even if it means breaking taboo and parlaying with the undead king of the Nation of Darkness!
1041	Kal Ho Naa Ho	https://posters.movieposterdb.com/12_05/2003/347304/s_347304_e7f7919b.jpg	2003	\N	\N	https://www.youtube.com/embed/tVMAQAsjsOU?si=PPwsCdvlcva7t_7s	\N	Approved	Completed	Naina's neighbor, Aman, introduces her to optimism, and makes her fall in love. But tragedy stopped him from moving forward. In fact, he encouraged his friend Rohit to seduce her.
1014	Harry Potter and The Prisoner of Azkaban	https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_QL75_UY281_CR0,0,190,281_.jpg	2004	\N	4016	https://www.youtube.com/embed/lAxgztbYDbs?si=4LSH7OrrkEUzKpp6	\N	Approved	Completed	Harry Potter (Daniel Radcliffe) is having a tough time with his relatives (yet again). He runs away after using magic to inflate Uncle Vernon's (Richard Griffiths') sister Marge (Pam Ferris), who was being offensive towards Harry's parents. Initially scared for using magic outside the school, he is pleasantly surprised that he won't be penalized after all. However, he soon learns that a dangerous criminal and Voldemort's trusted aide Sirius Black (Gary Oldman) has escaped from Azkaban Prison and wants to kill Harry to avenge the Dark Lord.
1029	Spider-Man: Across the Spider-Verse	https://posters.movieposterdb.com/23_06/2022/11290914/l_spider-man-across-the-spider-verse-part-one-movie-poster_37d41ec0.jpg	2023	\N	4017	https://www.youtube.com/embed/cqGjhVJWtEg?si=6ywJICuxbUo2bV5E	\N	Approved	Ongoing	Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.
1049	Young Sheldon	https://m.media-amazon.com/images/M/MV5BZTlmYjk0ZTItODNhMC00YmIyLWExZWEtYjk0YWQzMGNhOTZmXkEyXkFqcGdeQXVyMTY0Njc2MTUx._V1_FMjpg_UX1000_.jpg	2017	\N	4017	https://www.youtube.com/embed/FStMMcj-RiA?si=VAtm7vPF6zRaUqR-	\N	Approved	Completed	Meet a child genius named Sheldon Cooper (already seen as an adult in The Big Bang Theory (2007)) and his family. Some unique challenges face Sheldon, who is socially impaired.
1016	Harry Potter and The Order of The Phoenix	https://m.media-amazon.com/images/M/MV5BYWJmM2M1YzItMjY1Ni00YzRmLTg5YWYtNDFmNTJjNzQ0ODkyXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg	2007	\N	4016	https://www.youtube.com/embed/LLAaW1EgyY8?si=GbOzf_3RHhvi_T4D	\N	Approved	Completed	After a lonely summer on Privet Drive, Harry (Daniel Radcliffe) returns to a Hogwarts full of ill-fortune. Few of students and parents believe him or Dumbledore (Sir Michael Gambon) that Voldemort (Ralph Fiennes) is really back. The ministry had decided to step in by appointing a new Defense Against the Dark Arts teacher, Professor Dolores Umbridge (Imelda Staunton), who proves to be the nastiest person Harry has ever encountered. Harry also can't help stealing glances with the beautiful Cho Chang (Katie Leung). To top it off are dreams that Harry can't explain, and a mystery behind something for which Voldemort is searching. With these many things, Harry begins one of his toughest years at Hogwarts School of Witchcraft and Wizardry.
1026	Oppenheimer	https://posters.movieposterdb.com/23_06/2023/15398776/l_oppenheimer-movie-poster_a83f1cbb.jpg	2023	\N	4017	https://www.youtube.com/embed/uYPbbksJxIg?si=irGer-zxbuHx-0sQ	\N	Approved	Ongoing	The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.
1028	Spider-Man: Into the Spider-Verse	https://posters.movieposterdb.com/22_10/2018/4633694/l_spider-man-into-the-spider-verse-movie-poster_a7f62b30.jpeg	2018	\N	4017	https://www.youtube.com/embed/g4Hbz2jLxvQ?si=5tlrnErWOfDk27oV	\N	Approved	Ongoing	Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.
1022	Mencuri Raden Saleh	https://posters.movieposterdb.com/23_02/2022/13484872/l_mencuri-raden-saleh-movie-poster_56681bfe.jpg	2022	\N	4007	https://www.youtube.com/embed/DN3sRz_veBU?si=z258p8YJaBdUuaZu	Stealing Raden Saleh	Approved	Ongoing	To save his father, a master forger sets out to steal an invaluable painting with the help of a motley crew of specialists.
1032	The Fast and Furious 6	https://posters.movieposterdb.com/13_04/2013/1905041/l_1905041_1f36429c.jpg	2013	\N	4017	https://www.youtube.com/embed/oc_P11PNvRs?si=BFkiMHsRhAMZjglf	\N	Approved	Ongoing	Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets convoluted also facing his presumed deceased girlfriend, Letty.
1042	Kabhi Khushi Kabhie Gham	https://posters.movieposterdb.com/10_08/2001/248126/s_248126_0a404d08.jpg	2001	\N	\N	https://www.youtube.com/embed/7uY1JbWZKPA?si=af1-U9HW_Z5rlpn4	\N	Approved	Completed	Rahul is sad because his father disapproves of his relationship with the poor Anjali, but still marries her and moves to London. 10 years later, Rahul's younger brother wants to reconcile his father and brother.
1031	The Fast and the Furious: Tokyo Drift	https://posters.movieposterdb.com/06_07/2006/0463985/l_121979_0463985_7f210517.jpg	2006	\N	4017	https://www.youtube.com/embed/p8HQ2JLlc4E?si=35aLdiOpzDwGqGj2	\N	Approved	Ongoing	A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.
1023	Stranger Things	https://posters.movieposterdb.com/22_12/2016/4574334/l_stranger-things-movie-poster_5e41833a.jpg	2016	\N	4017	https://www.youtube.com/embed/mnd7sFt5c3A?si=3HdGY9TxmJOJ9Isf	\N	Approved	Ongoing	In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.
1009	Divergent	https://posters.movieposterdb.com/14_03/2014/1840309/s_1840309_2f948395.jpg	2014	4.0	4017	https://www.youtube.com/embed/Aw7Eln_xuWc?si=LHzGHv19MRmEFIyS	\N	Approved	Completed	In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late.
1011	Loki	https://cinemags.org/wp-content/uploads/2021/05/loki-poster.jpg	2021	\N	4017	https://www.youtube.com/embed/nW948Va-l10?si=H3ysHGo8HZOfBr8u	\N	Approved	Completed	The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”
1001	Crash Landing on You	https://upload.wikimedia.org/wikipedia/id/6/64/Crash_Landing_on_You_main_poster.jpg	2019	\N	4012	https://www.youtube.com/embed/GVQGWgeVc4k?si=QZuHBRX5tclra4BM	\N	Approved	Completed	The absolute top secret love story of a chaebol heiress who made an emergency landing in North Korea because of a paragliding accident and a North Korean special officer who falls in love with her and who is hiding and protecting her.
1013	Harry Potter and The Chamber of Secrets	https://m.media-amazon.com/images/M/MV5BMjE0YjUzNDUtMjc5OS00MTU3LTgxMmUtODhkOThkMzdjNWI4XkEyXkFqcGdeQXVyMTA3MzQ4MTc0._V1_.jpg	2002	\N	4016	https://www.youtube.com/embed/nE11U5iBnH0?si=kGF4qE1sPu58sKXe	\N	Approved	Completed	Harry Potter lives his second year at Hogwarts with Ron and Hermione when a message on the wall announces that the legendary Chamber of Secrets has been opened. The trio soon realize that, to save the school, it will take a lot of courage.
1002	The Goblin	https://upload.wikimedia.org/wikipedia/id/6/69/Golbin_Poster.jpg	2021	\N	4012	https://www.youtube.com/embed/vSQ-2incUEM?si=JHFgkNM2pH_qRMZU	\N	Approved	Completed	Former gangster Doo-hyun, known as "Goblin", served time for his boss' murder to protect Young-min. Out of prison, Young-min kidnaps Doo-hyun's daughter, forcing him to seek vengeance and reclaim his "Goblin" persona.
1003	Itaewon Class	https://upload.wikimedia.org/wikipedia/id/f/f9/Itaewon_Class_poster.jpg	2020	\N	4012	https://www.youtube.com/embed/NNP8m3gaaFE?si=nCj_1AiNroRhXEgf	\N	Approved	Completed	An ex-con opens a street bar in Itaewon, while also seeking revenge on the family who was responsible for his father's death.
1004	Vincenzo	https://awsimages.detik.net.id/community/media/visual/2021/03/01/vincenzo-1.png	2021	\N	4012	https://www.youtube.com/embed/_J8tYxYB_YU?si=eE9nmxYUw6ywgVpb	\N	Approved	Completed	During a visit to his motherland, a Korean-Italian Mafia lawyer gives an unrivaled conglomerate a taste of its own medicine with a side of justice.
1027	The Amazing Spider-Man	https://posters.movieposterdb.com/12_04/2012/948470/l_948470_406a814a.jpg	2012	\N	4017	https://www.youtube.com/embed/-tnxzJ0SSOw?si=buibBVd9g4JQwcY7	\N	Approved	Ongoing	After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to save the city from the machinations of a mysterious reptilian foe.
1019	Sherlock	https://posters.movieposterdb.com/10_08/2010/1475582/l_1475582_6c4d4dac.jpg	2010	\N	4017	https://www.youtube.com/embed/gGqWqGOSTGQ?si=iaRH6AqsJm1ASqhB	\N	Approved	Completed	The quirky spin on Conan Doyle's iconic sleuth pitches him as a "high-functioning sociopath" in modern-day London. Assisting him in his investigations: Afghanistan War vet John Watson, who's introduced to Holmes by a mutual acquaintance.
1050	Home Alone	https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg	1990	\N	4017	https://www.youtube.com/embed/NOIgZYlYvyk?si=okZFuMPYGDWFSDml	\N	Approved	Completed	An 8-year-old boy is accidentally left home alone by his family during Christmas vacation and must defend his home against two inept burglars.
1025	Good Will Hunting	https://posters.movieposterdb.com/10_09/1997/119217/l_119217_a4210c61.jpg	1997	\N	4017	https://www.youtube.com/embed/ReIJ1lbL-Q8?si=BhMK90AJb8czSkLg	\N	Approved	Ongoing	Will Hunting, a janitor at MIT, has a gift for mathematics, but needs help from a psychologist to find direction in his life.
1035	Overlord I	https://image.tmdb.org/t/p/original/hRshcrYYVkmrpKzbH9gNhYCcpGt.jpg	2015	\N	4009	https://www.youtube.com/embed/3jE9moHQePI?enablejsapi=1&wmode=opaque&autoplay=1	\N	Approved	Ongoing	The final hour of the popular virtual reality game Yggdrasil has come. However, Momonga, a powerful wizard and master of the dark guild Ainz Ooal Gown, decides to spend his last few moments in the game as the servers begin to shut down. To his surprise, despite the clock having struck midnight, Momonga is still fully conscious as his character and, moreover, the non-player characters appear to have developed personalities of their own! Confronted with this abnormal situation, Momonga commands his loyal servants to help him investigate and take control of this new world, with the hopes of figuring out what has caused this development and if there may be others in the same predicament.
1040	Ae Dil Hai Mushkil	https://posters.movieposterdb.com/21_11/2016/4559006/l_4559006_2672b3c1.jpg	2016	\N	\N	https://www.youtube.com/embed/Z_PODraXg4E?si=BGjAymIaBn-U9kdA	\N	Approved	Ongoing	Ayan goes on a quest for true love when Alizeh does not reciprocate his feelings. On his journey, he meets different people who make him realize the power of unrequited love.
1024	Alice in BorderLand	https://posters.movieposterdb.com/23_01/2020/10795658/l_alice-in-borderland-movie-poster_5e9fac9b.jpg	2020	\N	4009	https://www.youtube.com/embed/49_44FFKZ1M?si=_6I6taIQ1r3UXNm6	Imawa no Kuni no Arisu	Approved	Ongoing	Obsessed gamer Arisu suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in dangerous games in order to survive.
1005	Descendants of the Sun	https://upload.wikimedia.org/wikipedia/id/6/6e/DescendantsoftheSun.jpg	2016	5.0	4012	https://www.youtube.com/embed/wkHjOTFv60g?si=dvfKO8KZX9TcekOn	\N	Approved	Completed	This drama tells of the love story that develops between a surgeon and a special forces officer.
1045	Locke and Key	https://m.media-amazon.com/images/M/MV5BOTdkMDY3NDctZTgyZi00Yzc3LTk1ZWEtNWUxNTVlN2YzNDU3XkEyXkFqcGdeQXVyNDk3ODk4OQ@@._V1_.jpg	2020	\N	4017	https://www.youtube.com/embed/_EonRi0yQOE?si=rBJ5R1wGSnOvtqld	\N	Approved	Completed	After their father is murdered under mysterious circumstances, the three Locke siblings and their mother move into their ancestral home, Keyhouse, which they discover is full of magical keys that may be connected to their father's death.
1034	Furious 7	https://posters.movieposterdb.com/22_05/2009/940657/l_940657_2a184c06.jpg	2015	\N	4017	https://www.youtube.com/embed/Skpu5HaVkOc?si=7waJ6a_NOnd42okk	\N	Approved	Ongoing	Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.
1008	Maze Runner: The Death Cure	https://posters.movieposterdb.com/20_06/2018/4500922/s_4500922_2663b144.jpg	2018	\N	4017	https://www.youtube.com/embed/4-BTxXm8KSg?si=knuSPoN5Y6LaKiNO	\N	Approved	Completed	In the epic finale to The Maze Runner Saga, Thomas leads his group of escaped Gladers on their final and most dangerous mission yet. To save their friends, they must break into the legendary last city, a WCKD controlled labyrinth that may turn out to be the deadliest maze of all. Anyone who makes it out alive will get the answers to the questions the Gladers have been asking since they first arrived in the maze. Will Thomas and the crew make it out alive? Or will Ava Paige get her way?
1010	Insurgent	https://posters.movieposterdb.com/15_01/2015/2908446/s_2908446_b96edb43.jpg	2015	\N	4017	https://www.youtube.com/embed/OBn_LRp-D7U?si=Dwgd4SxcyEG9vm6l	The Divergent Series: Insurgent	Approved	Completed	Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side.
1030	The Fast and the Furious	https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg	2001	\N	4017	https://www.youtube.com/embed/2TAOizOnNPo?si=qJS3zNfmfRAfThrr	\N	Approved	Ongoing	Los Angeles street racer Dominic Toretto falls under the suspicion of the LAPD as a string of high-speed electronics truck robberies rocks the area. Brian O'Connor, an officer of the LAPD, joins the ranks of Toretto's highly skilled racing crew undercover to convict Toretto. However, O'Connor finds himself both enamored with this new world and in love with Toretto's sister, Mia. As a rival racing crew gains strength, O'Connor must decide where his loyalty really lies.
1038	Overlord IV	https://image.tmdb.org/t/p/original/lB0IMdLr4rwbBGx0aYVSjXvxzh.jpg	2022	\N	4009	https://www.youtube.com/embed/tNYQjEyTO6s?enablejsapi=1&wmode=opaque&autoplay=1	\N	Approved	Ongoing	E-Rantel, the capital city of the newly established Sorcerer Kingdom, suffers from a dire shortage of goods. Once a prosperous city known for its trade, it now faces a crisis due to its caution—or even fear—of its king, Ainz Ooal Gown. To make amends, Ainz sends Albedo to the city as a diplomatic envoy. Meanwhile, the cardinals of the Slane Theocracy discuss how to retaliate against Ainz after his attack crippled the Re-Estize Kingdom's army, plotting for the Baharuth Empire to take over the Sorcerer Kingdom. However, when Emperor Jircniv Rune Farlord El Nix arranges a meeting with the Theocracy's messengers at a colosseum, he is confronted by none other than Ainz himself. With their secret gathering now out in the open, the emperor and his guests learn that Ainz has challenged the Warrior King, the empire's greatest fighter, to a duel. With Ainz's motivations beyond his comprehension, Jircniv can do nothing but watch as humanity's future changes before his very eyes.
1018	500 days of summer	https://posters.movieposterdb.com/09_10/2009/1022603/l_1022603_997c5a61.jpg	2009	\N	4017	https://www.youtube.com/embed/PsD0NpFSADM?si=Sv8WMgQNQdZQ3LmB	\N	Approved	Completed	After being dumped by the girl he believes to be his soulmate, hopeless romantic Tom Hansen reflects on their relationship to try and figure out where things went wrong and how he can win her back.
1017	13 Reasons Why	https://posters.movieposterdb.com/21_02/2017/1837492/s_1837492_8fa1eebf.jpg	2017	4.0	4017	https://www.youtube.com/embed/QkT-HIMSrRk?si=WT8gEDOWuHKKhzuU	\N	Approved	Completed	Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.
1048	Bohemian Rhapsody	https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_FMjpg_UX1000_.jpg	2018	\N	4007	https://www.youtube.com/embed/mP0VHJYFOAU?si=mS0g4hcx04eGXZqH	\N	Approved	Completed	The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985)
1051	The Shining	https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg	1980	\N	4017	https://www.youtube.com/embed/FZQvIJxG9Xs?si=K15qYnkcOyPWLyvp	\N	Approved	Completed	A family heads to an isolated hotel for the winter, where a sinister presence influences the father into violence. At the same time, his psychic son sees horrifying forebodings from both the past and the future.
1052	I Want to Eat Your Pancreas	https://m.media-amazon.com/images/M/MV5BMTQ1ODIzOGQtOGFkZC00MWViLTgyYmUtNWJkNmIxZjYxMTdmXkEyXkFqcGc@._V1_.jpg	2018	\N	4009	https://www.youtube.com/embed/HuN15mDKakk?si=wPri_WCl4ZAAn23d	Kimi no suizô o tabetai	Approved	Completed	A high school student discovers one of his classmates, Sakura Yamauchi, is suffering from a terminal illness. This secret brings the two together, as she lives out her final moments.
1053	Hereditary	https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg	2018	\N	4017	https://www.youtube.com/embed/V6wWKNij_1M?si=Ki9R4PN1hJ6e2xch	\N	Approved	Completed	A grieving family is haunted by tragic and disturbing occurrences.
1054	Perfume: The Story of a Murderer	https://m.media-amazon.com/images/M/MV5BMTg2Mzk2NjkzNl5BMl5BanBnXkFtZTYwMzIzOTc2._V1_.jpg	2006	\N	4005	https://www.youtube.com/embed/_-qv0EnGhJU?si=bJmtGP563u0MPnDy	\N	Approved	Completed	Jean-Baptiste Grenouille, born with a superior olfactory sense, creates the world's finest perfume. His work, however, takes a dark turn as he searches for the ultimate scent.
1046	Gadis Kretek	https://m.media-amazon.com/images/M/MV5BYzcxYzIzODItMTljNy00OGYwLWJmMWUtNzIyZDdiOTI1MWNlXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg	2023	\N	4007	https://www.youtube.com/embed/PJybk11EIm8?si=HT4aKW5OchOr2aND	Cigarette Girl	Approved	Completed	Amid the evocative blend of flavorful spices to create the perfect kretek cigarette, two souls embark on an epic romance set in 1960s Indonesia.
1036	Overlord II	https://image.tmdb.org/t/p/original/jdzYWuAz58vVcTNqtm3aj4yUKa7.jpg	2018	\N	4009	https://www.youtube.com/embed/p2ksX48PBQY?enablejsapi=1&wmode=opaque&autoplay=1	\N	Approved	Ongoing	Ainz Ooal Gown, the undead sorcerer formerly known as Momonga, has accepted his place in this new world. Though it bears similarities to his beloved virtual reality game Yggdrasil, it still holds many mysteries which he intends to uncover, by utilizing his power as ruler of the Great Tomb of Nazarick. However, ever since the disastrous brainwashing of one of his subordinates, Ainz has become wary of the impending dangers of the Slane Theocracy, as well as the possible existence of other former Yggdrasil players. Meanwhile, Albedo, Demiurge and the rest of Ainz's loyal guardians set out to prepare for the next step in their campaign: Nazarick's first war… Overlord II picks up immediately after its prequel, continuing the story of Ainz Ooal Gown, his eclectic army of human-hating guardians, and the many hapless humans affected by the Overlord's arrival.
1037	Overlord III	https://image.tmdb.org/t/p/original/uuYAJYqawtCqZD9ftxDclu5zXPN.jpg	2018	\N	4009	https://www.youtube.com/embed/awYU-9jVZxE?enablejsapi=1&wmode=opaque&autoplay=1	\N	Approved	Ongoing	Following the horrific assault on the Re-Estize capital city, the Guardians of the Great Tomb of Nazarick return home to their master Ainz Ooal Gown. After months of laying the groundwork, they are finally ready to set their plans of world domination into action. As Ainz's war machine gathers strength, the rest of the world keeps moving. The remote Carne Village, which Ainz once saved from certain doom, continues to prosper despite the many threats on its doorstep. And in the northeastern Baharuth Empire, a certain Bloody Emperor sets his sights on the rising power of Nazarick. Blood is shed, heroes fall, and nations rise. Can anyone, or anything, challenge the supreme power of Ainz Ooal Gown?
1043	Jab Tak Hai Jaan	https://posters.movieposterdb.com/12_09/2012/2176013/s_2176013_f513dba4.jpg	2012	\N	\N	https://www.youtube.com/embed/v0UXgoJ9Shg?si=kub7prUDjl6rCXBR	\N	Approved	Completed	Samar Anand is forced to leave his girlfriend, Khushi (Katrina Kaif). From London, he returns to Kashmir leaving his past behind, and meets Akira, a cheerful woman who works for a television program about wildlife. Will Samar still hope for Khushi or choose to start a new life with Akira?
1056	Transformers: Revenge of the Fallen	https://m.media-amazon.com/images/M/MV5BNjk4OTczOTk0NF5BMl5BanBnXkFtZTcwNjQ0NzMzMw@@._V1_.jpg	2009	\N	4017	https://www.youtube.com/embed/fnXzKwUgDhg?si=GcetFv28Pl8i_lrw	\N	Approved	Completed	A youth chooses manhood. The week Sam Witwicky starts college, the Decepticons make trouble in Shanghai. A presidential envoy believes it's because the Autobots are around; he wants them gone. He's wrong: the Decepticons need access to Sam's mind to see some glyphs imprinted there that will lead them to a fragile object that, when inserted in an alien machine hidden in Egypt for centuries, will give them the power to blow out the sun. Sam, his girlfriend Mikaela Banes, and Sam's parents are in danger. Optimus Prime and Bumblebee are Sam's principal protectors. If one of them goes down, what becomes of Sam?
1055	Boys Over Flowers	https://m.media-amazon.com/images/M/MV5BZmNmMTdhNzItNjM4ZC00NjgxLWIwNWMtMzkxZWZkZWVjMzZkXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg	2009	5.0	4012	https://www.youtube.com/embed/RNf7htKrZuc?si=oclRxkZWEJbBLcJb	Kkotboda namja	Approved	Completed	Geum Jan Di gets a scholarship to the elite Shin Hwa High School. She is picked on by Gu Jun Pyo, one of the richest and most popular students, but soon Jun Pyo finds himself attracted to her.
1006	The Maze Runner	https://posters.movieposterdb.com/14_08/2014/1790864/s_1790864_fe41cf34.jpg	2014	\N	4017	https://www.youtube.com/embed/AwwbhhjQ9Xk?si=OBHSd5rRN4WCrpMZ	\N	Approved	Completed	Awakening in an elevator, remembering nothing of his past, Thomas emerges into a world of about thirty teenage boys, all without past memories, who have learned to survive under their own set of rules in a completely enclosed environment, subsisting on their own agriculture and supplies. With a new boy arriving every thirty days, the group has been in "The Glade" for three years, trying to find a way to escape through the Maze that surrounds their living space (patrolled by cyborg monsters named 'Grievers'). They have begun to give up hope when a comatose girl arrives with a strange note, and their world begins to change with the boys dividing into two factions: those willing to risk their lives to escape and those wanting to hang onto what they've got and survive.
1057	Transformers: Dark of the Moon	https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_FMjpg_UY478_.jpg	2011	\N	4017	https://www.youtube.com/embed/97wCoDn0RrA?si=NNj_X7W2Nkwg95QJ	\N	Approved	Completed	Autobots Bumblebee, Ratchet, Ironhide, Mirage (aka Dino), Wheeljack (aka Que) and Sideswipe led by Optimus Prime, are back in action taking on the evil Decepticons, who are eager to avenge their recent defeat. The Autobots and Decepticons become involved in a perilous space race between the United States and Russia to reach a hidden Cybertronian spacecraft on the moon and learn its secrets, and once again Sam Witwicky has to go to the aid of his robot friends. The new villain Shockwave is on the scene while the Autobots and Decepticons continue to battle it out on Earth.
1058	Transformers: Age of Extinction	https://m.media-amazon.com/images/M/MV5BMjEwNTg1MTA5Nl5BMl5BanBnXkFtZTgwOTg2OTM4MTE@._V1_FMjpg_UY749_.jpg	2014	\N	4017	https://www.youtube.com/embed/T9bQCAWahLk?si=bql7kcBy0CP3e7nL	\N	Approved	Completed	After the battle between the Autobots and Decepticons that leveled Chicago, humanity thinks that all alien robots are a threat. So Harold Attinger, a CIA agent, establishes a unit whose sole purpose is to hunt down all of them. But it turns out that they are aided by another alien robot who is searching for Optimus Prime. Cade Yeager, a "robotics expert", buys an old truck and upon examining it, he thinks it's a Transformer. When he powers it up, he discovers it's Optimus Prime. Later, men from the unit show up looking for Optimus. He helps Yeager and his daughter Tessa escape but are pursued by the hunter. They escape and Yeager learns from technology he took from the men that a technology magnate and defense contractor named Joshua Joyce is part of what's going on, so they go to find out what's going on.
1059	Transformers: The Last Knight	https://m.media-amazon.com/images/M/MV5BYWNlNjU3ZTItYTY3Mi00YTU1LTk4NjQtYjQ3MjFiNjcyODliXkEyXkFqcGc@._V1_.jpg	2017	\N	4017	https://www.youtube.com/embed/6Vtf0MszgP8?si=bOSZ19b15dVIx4sc	\N	Approved	Completed	Having left Earth, Optimus Prime finds his dead home planet, Cybertron, and discovers that he was in fact responsible for its destruction. Optimus learns that he can bring Cybertron back to life, but in order to do so, he will need an artifact that is hidden on Earth.
1060	Transformers: Rise of the Beasts	https://m.media-amazon.com/images/M/MV5BZTVkZWY5MmItYjY3OS00OWY3LTg2NWEtOWE1NmQ4NGMwZGNlXkEyXkFqcGc@._V1_FMjpg_UY711_.jpg	2023	\N	4017	https://www.youtube.com/embed/itnqEauWQZM?si=aiaMmgPZwi6fqKXQ	\N	Approved	Completed	Returning to the action and spectacle that has captivated moviegoers around the world, Transformers: Rise of the Beasts will take audiences on a global '90s adventure with the Autobots and introduce a new faction of Transformers - the Maximals - to join them as allies in the war. the ongoing battle on earth. Directed by Steven Caple Jr. and starring Anthony Ramos and Dominique Fishback
1047	Nightmares and Daydreams	https://m.media-amazon.com/images/M/MV5BMTc4N2M4OTEtMGExMS00MDJkLWJkYjUtOTI5MmQ4NjhjYjJiXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg	2024	\N	4007	https://www.youtube.com/embed/YF6s3lIc17Q?si=Nx-glvluNwin8LFq	\N	Approved	Completed	Ordinary people encountering strange phenomenons that may be keys to the answer about the origin of our world and the imminent threat we will soon face.
1007	The Maze Runner: Scorch Trials	https://posters.movieposterdb.com/15_05/2015/4046784/s_4046784_cbb64415.jpg	2015	\N	4017	https://www.youtube.com/embed/-44_igsZtgU?si=_kRKJOa9DN0fYbg2	\N	Approved	Completed	The second chapter of the epic "Maze Runner" saga. Thomas (Dylan O'Brien) and his fellow Gladers face their greatest challenge yet: searching for clues about the mysterious and powerful organization known as WCKD. Their journey takes them to the Scorch, a desolate landscape filled with unimaginable obstacles. Teaming up with resistance fighters, the Gladers take on WCKD's vastly superior forces and uncover its shocking plans for them all.
1012	Harry Potter and The Sorcerer’s Stone	https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg	2001	4.0	4016	https://www.youtube.com/embed/VyHV0BRtdxo?si=m1v8O00w6gjznox9	\N	Approved	Completed	An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.
1015	Harry Potter and The Goblet of Fire	https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_QL75_UY281_CR0,0,190,281_.jpg	2005	\N	4016	https://www.youtube.com/embed/80kuiBq95So?si=fDnYxNyp7xPyEkNc	\N	Approved	Completed	Harry's (Daniel Radcliffe's) fourth year at Hogwarts is about to start and he is enjoying the summer vacation with his friends. They get the tickets to The Quidditch World Cup Final, but after the match is over, people dressed like Lord Voldemort's (Ralph Fiennes') "Death Eaters" set a fire to all of the visitors' tents, coupled with the appearance of Voldemort's symbol, the "Dark Mark" in the sky, which causes a frenzy across the magical community. That same year, Hogwarts is hosting "The Triwizard Tournament", a magical tournament between three well-known schools of magic : Hogwarts, Beauxbatons, and Durmstrang. The contestants have to be above the age of seventeen, and are chosen by a magical object called "The Goblet of Fire". On the night of selection, however, the Goblet spews out four names instead of the usual three, with Harry unwittingly being selected as the Fourth Champion. Since the magic cannot be reversed, Harry is forced to go with it and brave three exceedingly difficult tasks.
1044	Bajrangi Bhaijaan	https://posters.movieposterdb.com/15_09/2015/3863552/s_3863552_b160f1f4.jpg	2015	\N	\N	https://www.youtube.com/embed/4nwAra0mz_Q?si=BRBHYT8I_KFGNpRR	\N	Approved	Completed	Pavan, a devotee of Hanuman, faces various challenges when he tries to reunite Munni with her family after Munni goes missing while traveling back home with her mother.
1020	The Butterfly Effect	https://posters.movieposterdb.com/12_11/2004/289879/s_289879_365cbc14.jpg	2004	\N	4017	https://www.youtube.com/embed/LOS5YgJkjZ0?si=EnV0x8KQ4zuUOQ-l	\N	Approved	Completed	Evan Treborn suffers blackouts during significant events of his life. As he grows up, he finds a way to remember these lost memories and a supernatural way to alter his life by reading his journal.
1021	Twenty Five Twenty One	https://posters.movieposterdb.com/23_03/2022/17513352/l_twenty-five-twenty-one-movie-poster_83675ed1.jpg	2022	\N	4012	https://www.youtube.com/embed/n7F8o-SoK8s?si=03J3LFaPpu_QSl7b	Seumuldaseot Seumulhana	Approved	Ongoing	In a time when dreams seem out of reach, a teen fencer pursues big ambitions and meets a hardworking young man who seeks to rebuild his life. At 22 and 18, they say each other's names for the first time, at 25 and 21, they fall in love.
1061	man	\N	2022	\N	4002	https://www.youtube.com/embed/AT7-6rYZUTI?si=m2dj1tS3MfzjsJoU	testing	Approved	\N	blablablablablablablablablablablablablablablablablablablablablablablablablablablabla
\.


--
-- Data for Name: genre_drama; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre_drama (drama_id, genre_id) FROM stdin;
1001	2017
1001	2001
1001	2005
1002	2001
1003	2007
1003	2017
1004	2001
1004	2005
1004	2007
1004	2006
1005	2001
1005	2005
1005	2007
1005	2017
1006	2001
1006	2015
1006	2018
1006	2024
1007	2001
1007	2002
1007	2018
1007	2024
1008	2001
1008	2002
1008	2018
1008	2024
1009	2001
1009	2002
1009	2015
1009	2018
1010	2001
1010	2002
1010	2018
1010	2024
1011	2022
1011	2002
1011	2009
1012	2002
1012	2008
1012	2009
1013	2002
1013	2008
1013	2009
1013	2015
1014	2002
1014	2008
1014	2009
1014	2015
1015	2002
1015	2008
1015	2009
1015	2015
1016	2002
1016	2008
1016	2009
1016	2015
1017	2007
1017	2015
1017	2024
1018	2005
1018	2007
1018	2017
1019	2006
1019	2007
1019	2015
1019	2024
1020	2007
1020	2018
1020	2024
1021	2017
1021	2007
1021	2005
1022	2001
1022	2007
1022	2006
1022	2005
1023	2018
1023	2012
1023	2015
1023	2007
1024	2001
1024	2018
1024	2015
1024	2024
1025	2007
1025	2018
1025	2024
1026	2007
1026	2018
1026	2024
1027	2007
1027	2018
1027	2024
1028	2007
1028	2018
1028	2024
1029	2007
1029	2018
1029	2024
1030	2001
1030	2006
1030	2024
1031	2001
1031	2006
1031	2024
1032	2001
1032	2006
1032	2024
1033	2001
1033	2006
1033	2024
1034	2001
1034	2006
1034	2024
1035	2001
1035	2002
1035	2003
1035	2009
1036	2001
1036	2002
1036	2003
1036	2009
1037	2001
1037	2002
1037	2003
1037	2009
1038	2001
1038	2002
1038	2003
1038	2009
1039	2001
1039	2002
1039	2003
1039	2009
1040	2017
1040	2014
1041	2017
1041	2014
1041	2005
1042	2007
1042	2014
1042	2008
1043	2017
1043	2007
1044	2002
1044	2007
1044	2008
1045	2007
1045	2009
1045	2012
1045	2015
1045	2024
1046	2007
1046	2011
1046	2017
1047	2007
1047	2012
1047	2015
1047	2018
1047	2024
1048	2004
1048	2007
1048	2014
1049	2005
1050	2005
1050	2008
1051	2007
1051	2012
1052	2007
1052	2020
1052	2008
1052	2017
1053	2010
1053	2024
1053	2007
1054	2006
1054	2007
1054	2009
1055	2005
1055	2007
1055	2017
1056	2001
1056	2002
1056	2018
1057	2001
1057	2002
1057	2018
1058	2001
1058	2002
1058	2018
1059	2001
1059	2002
1059	2018
1060	2001
1060	2002
1060	2018
1061	2001
1061	2002
1061	2003
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (genre_id, genres) FROM stdin;
2001	Action
2003	Animation
2004	Biography
2005	Comedy
2006	Crime
2007	Drama
2008	Family
2009	Fantasy
2011	History
2012	Horror
2013	Martial Arts
2014	Musical
2015	Mystery
2016	Quest
2017	Romance
2018	Sci-Fi
2019	Serial Killer
2020	Slice of Life
2021	Sport
2022	Superhero
2023	Supernatural
2024	Thirller
2010	Friendship
2002	Adventures
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password, role, google_id, created_at, status) FROM stdin;
6001	admindramaku	admin@gmail.com	$2b$10$aL2U5njH5W348aMrfD29M.4lZMZcnEvmt4JZdQflg/5lHkyPhRsLO	Admin	\N	2024-10-12	Active
6008	ayocoba	ayo@gmail.com	$2b$10$Zimz8zLPag.mCgFRFtPJxuN8MeT7C7xnE6ur1QNcwsoEQDIqv/NTS	Writer	\N	2024-10-31	Active
6010	test	test@gmail.com	$2b$10$KwB4cqWykcE.xf1mybtcCuQEdOluc37D/DIZd0rfnGbLV1EkYwwxO	Writer	\N	2024-11-03	Active
6012	Alisha Nara	alishanara04@gmail.com	\N	Writer	105055447544871063015	2024-11-11	Active
6011	nara	nara@gmail.com	$2b$10$/Ion6z2oGa3OYIpyi1tERetl0agmV7QKt0u7VGt.FlPijST8ddolS	Writer	\N	2024-11-11	Suspended
\.


--
-- Data for Name: wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist (wishlist_id, user_id, drama_id) FROM stdin;
9001	6001	1033
9003	6001	1017
9004	6001	1012
9005	6011	1009
\.


--
-- Name: actors_actor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actors_actor_id_seq', 3195, true);


--
-- Name: awards_award_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.awards_award_id_seq', 8042, true);


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 7043, true);


--
-- Name: countries_country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_country_id_seq', 4017, true);


--
-- Name: drama_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.drama_id_seq', 1061, true);


--
-- Name: genres_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_genre_id_seq', 2024, true);


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seq', 6012, true);


--
-- Name: wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.wishlist_id_seq', 9005, true);


--
-- Name: actors actors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actors
    ADD CONSTRAINT actors_pkey PRIMARY KEY (actor_id);


--
-- Name: availability availability_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (avail_id);


--
-- Name: awards awards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.awards
    ADD CONSTRAINT awards_pkey PRIMARY KEY (award_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (country_id);


--
-- Name: dramas dramas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dramas
    ADD CONSTRAINT dramas_pkey PRIMARY KEY (drama_id);


--
-- Name: genre_drama genre_drama_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre_drama
    ADD CONSTRAINT genre_drama_pkey PRIMARY KEY (drama_id, genre_id);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genre_id);


--
-- Name: users users_google_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_google_id_key UNIQUE (google_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: wishlist wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_pkey PRIMARY KEY (wishlist_id);


--
-- Name: comments comments_drama_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_drama_id_fkey FOREIGN KEY (drama_id) REFERENCES public.dramas(drama_id) ON DELETE CASCADE;


--
-- Name: actor_drama fk_actor_drama_actor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_drama
    ADD CONSTRAINT fk_actor_drama_actor_id FOREIGN KEY (actor_id) REFERENCES public.actors(actor_id) ON DELETE CASCADE;


--
-- Name: actor_drama fk_actor_drama_drama_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor_drama
    ADD CONSTRAINT fk_actor_drama_drama_id FOREIGN KEY (drama_id) REFERENCES public.dramas(drama_id) ON DELETE CASCADE;


--
-- Name: avail_drama fk_avail_drama_avail_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avail_drama
    ADD CONSTRAINT fk_avail_drama_avail_id FOREIGN KEY (avail_id) REFERENCES public.availability(avail_id) ON DELETE CASCADE;


--
-- Name: avail_drama fk_avail_drama_drama_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.avail_drama
    ADD CONSTRAINT fk_avail_drama_drama_id FOREIGN KEY (drama_id) REFERENCES public.dramas(drama_id) ON DELETE CASCADE;


--
-- Name: award_drama fk_award_drama_award_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.award_drama
    ADD CONSTRAINT fk_award_drama_award_id FOREIGN KEY (award_id) REFERENCES public.awards(award_id) ON DELETE CASCADE;


--
-- Name: award_drama fk_award_drama_drama_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.award_drama
    ADD CONSTRAINT fk_award_drama_drama_id FOREIGN KEY (drama_id) REFERENCES public.dramas(drama_id) ON DELETE CASCADE;


--
-- Name: dramas fk_dramas_country; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dramas
    ADD CONSTRAINT fk_dramas_country FOREIGN KEY (country) REFERENCES public.countries(country_id) ON DELETE SET NULL;


--
-- Name: genre_drama fk_genre_drama_drama_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre_drama
    ADD CONSTRAINT fk_genre_drama_drama_id FOREIGN KEY (drama_id) REFERENCES public.dramas(drama_id) ON DELETE CASCADE;


--
-- Name: genre_drama fk_genre_drama_genre_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre_drama
    ADD CONSTRAINT fk_genre_drama_genre_id FOREIGN KEY (genre_id) REFERENCES public.genres(genre_id) ON DELETE CASCADE;


--
-- Name: genre_drama genre_drama_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre_drama
    ADD CONSTRAINT genre_drama_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(genre_id);


--
-- Name: wishlist wishlist_drama_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_drama_id_fkey FOREIGN KEY (drama_id) REFERENCES public.dramas(drama_id);


--
-- Name: wishlist wishlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist
    ADD CONSTRAINT wishlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

