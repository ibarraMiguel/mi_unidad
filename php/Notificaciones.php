<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once(APPPATH.'/libraries/REST_Controller.php');
use Restserver\libraries\Rest_Controller;

class Notificaciones extends REST_Controller {

public function __construct(){
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
header("Access-Control-Allow-Origin: *");
parent::__construct();
$this->load->helper('url');
}

public function load_post(){
$token = $this->post("token");
$comment = $this->post("comentario");
$this->_chat($token,$comment);
}

private function _chat($token,$comment){
if ($comment!='') {
$data = array(
'to' => $token,
'collapse_key'=>'new_content',
'priority'=>'high',
'data'=> array('title'=>'Recursos Humanos APP',
'message'=>$comment,
'content_id'=>1,
'content-available'=>1),
'notification'=> array('title'=>'Recursos Humanos APP',
'body'=>$comment,
'content_id'=>1,
'content-available'=>1,
'sound'=>'default',
'icon' => 'https://rrhh.communitymaker.co/users/assets/img/icono.png')
);

}else{
$data = array(
'to' => $token,
'collapse_key'=>'new_content',
'priority'=>'high',
'data'=> array('title'=>'Recursos Humanos APP',
'message'=>$comment,
'content_id'=>1,
'content-available'=>1),
'notification'=> array('title'=>'Recursos Humanos APP',
'body'=>'Tiene un nuevo mensaje en el chat',
'content_id'=>1,
'content-available'=>1,
'sound'=>'default',
'icon' => 'https://rrhh.communitymaker.co/users/assets/img/icono.png')
);
}

$headers = array('Authorization: key=AIzaSyCqV8DvPTYSr7PyUN1jNcRS1r5iw7ZnsyM','Content-Type: application/json');
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $data ) );
$result = curl_exec($ch );
curl_close( $ch );

$this->response($result);
}
}
