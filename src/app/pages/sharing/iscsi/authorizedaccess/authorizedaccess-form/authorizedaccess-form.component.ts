import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { helptext_sharing_iscsi } from 'app/helptext/sharing';
import { matchOtherValidator, doesNotEqual } from "app/pages/common/entity/entity-form/validators/password-validation";
import { AppLoaderService } from '../../../../../services/app-loader/app-loader.service';
import { WebSocketService } from '../../../../../services/ws.service';
import { FieldConfig } from '../../../../common/entity/entity-form/models/field-config.interface';
import { EntityUtils } from '../../../../common/entity/utils';

@Component({
  selector : 'app-iscsi-authorizedaccess-form',
  template : `<entity-form [conf]="this"></entity-form>`
})
export class AuthorizedAccessFormComponent {

  protected addCall: string = 'iscsi.auth.create';
  protected queryCall: string = 'iscsi.auth.query';
  protected editCall = 'iscsi.auth.update';
  // protected resource_name: string = 'services/iscsi/authcredential';
  protected route_success: string[] = [ 'sharing', 'iscsi', 'auth' ];
  protected isEntity: boolean = true;
  protected customFilter: Array<any> = [[["id", "="]]];

  protected fieldConfig: FieldConfig[] = [
    {
      type : 'input',
      name : 'tag',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_tag,
      tooltip: helptext_sharing_iscsi.authaccess_tooltip_tag,
      inputType : 'number',
      min: 0,
      required: true,
      validation : [Validators.required, Validators.min(0)]
    },
    {
      type : 'input',
      name : 'user',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_user,
      tooltip: helptext_sharing_iscsi.authaccess_tooltip_user,
      validation : [Validators.required],
      required: true,
    },
    {
      type : 'input',
      name : 'secret',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_secret,
      tooltip: helptext_sharing_iscsi.authaccess_tooltip_secret,
      inputType : 'password',
      togglePw: true,
      required: true,
      validation : [
        Validators.minLength(12),
        Validators.maxLength(16),
        Validators.required,
        matchOtherValidator("secret_confirm")
      ],
    },
    {
      type : 'input',
      name : 'secret_confirm',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_secret_confirm,
      inputType : 'password'
    },
    {
      type : 'input',
      name : 'peeruser',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_peeruser,
      tooltip: helptext_sharing_iscsi.authaccess_tooltip_peeruser,
    },
    {
      type : 'input',
      name : 'peersecret',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_peersecret,
      tooltip: helptext_sharing_iscsi.authaccess_tooltip_peersecret,
      inputType : 'password',
      togglePw: true,
      validation : [
        Validators.minLength(12),
        Validators.maxLength(16),
        doesNotEqual("secret"),
        matchOtherValidator("peersecret_confirm")
      ],
    },
    {
      type : 'input',
      name : 'peersecret_confirm',
      placeholder : helptext_sharing_iscsi.authaccess_placeholder_peersecret_confirm,
      inputType : 'password'
    },
  ];

  protected pk: any;
  protected peeruser_field: any;
  protected peersecret_field: any;

  constructor(protected router: Router, protected aroute: ActivatedRoute, protected loader: AppLoaderService,
              protected ws: WebSocketService) {}

  preInit() {
    this.aroute.params.subscribe(params => {
      if (params['pk']) {
        this.pk = params['pk'];
        this.customFilter[0][0].push(parseInt(params['pk'], 10));
      }
    });
  }

  afterInit(entityForm) {
    const secretControl: FormControl = entityForm.formGroup.controls['secret'];
    const peersecretControl: FormControl = entityForm.formGroup.controls['peersecret'];
    const peersecretConfig = this.fieldConfig.find(config => config.name === 'peersecret');

    entityForm.formGroup.controls['peeruser'].valueChanges.subscribe((res) => {
      if (res != '') {
        peersecretControl.setValidators([
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(16),
          matchOtherValidator("peersecret_confirm"),
          doesNotEqual("secret")
        ]);
        peersecretConfig.required = true;
      } else {
        peersecretControl.clearValidators();
        peersecretConfig.required = false;
      }
      peersecretControl.updateValueAndValidity();
    });

    [secretControl, peersecretControl].forEach((ctrl, index) => {
      ctrl.valueChanges.subscribe((res) => {
        let errors = ctrl.errors;
        const compartedCtrlName = index === 0 ? 'peersecret' : 'secret';
        if (res === entityForm.formGroup.controls[compartedCtrlName].value) {
          if (!ctrl.hasError('manualValidateError')) {
            if (errors === null) {
              errors = { manualValidateError: true, manualValidateErrorMsg: helptext_sharing_iscsi.authaccess_error_duplicate_secrets };
            } else {
              errors['manualValidateError'] = true;
              errors['manualValidateErrorMsg'] = helptext_sharing_iscsi.authaccess_error_duplicate_secrets;
            }
          }
        } else {
          if (ctrl.hasError('manualValidateError')) {
            delete errors['manualValidateError'];
            delete errors['manualValidateErrorMsg'];
          }
        }
        ctrl.setErrors(errors);
      });
    })
  }

  beforeSubmit(value) {
    delete value['secret_confirm'];
    delete value['peersecret_confirm'];
  }

  customEditCall(value) {
    this.loader.open();
    this.ws.call(this.editCall, [this.pk, value]).subscribe(
      (res) => {
        this.loader.close();
        this.router.navigate(new Array('/').concat(this.route_success));
      },
      (res) => {
        this.loader.close();
        new EntityUtils().handleWSError(this, res);
      }
    );
  }
}
